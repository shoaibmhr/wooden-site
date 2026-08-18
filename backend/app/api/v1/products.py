from decimal import Decimal
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.deps import require_admin
from app.db.session import get_db
from app.models.category import Category
from app.models.product import Product, ProductImage
from app.models.user import User
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


def product_query():
    return select(Product).options(
        selectinload(Product.category),
        selectinload(Product.images),
    )


@router.post(
    "/",
    response_model=ProductRead,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    category = db.get(Category, product_in.category_id)

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found.",
        )

    existing_product = db.scalar(
        select(Product).where(Product.slug == product_in.slug)
    )

    if existing_product:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A product with this slug already exists.",
        )

    product_data = product_in.model_dump(exclude={"images"})
    product = Product(**product_data)

    product.images = [
        ProductImage(**image.model_dump())
        for image in product_in.images
    ]

    db.add(product)
    db.commit()
    db.refresh(product)

    return db.scalar(
        product_query().where(Product.id == product.id)
    )


@router.get("/", response_model=list[ProductRead])
def list_products(
    category_slug: str | None = None,
    search: str | None = None,
    min_price: Decimal | None = Query(default=None, ge=0),
    max_price: Decimal | None = Query(default=None, ge=0),
    sort_by: Literal[
        "featured",
        "price-low",
        "price-high",
        "rating",
    ] = "featured",
    db: Session = Depends(get_db),
):
    query = product_query().where(Product.is_active.is_(True))

    if category_slug:
        query = query.join(Product.category).where(
            Category.slug == category_slug
        )

    if search and search.strip():
        query = query.where(
            Product.name.ilike(f"%{search.strip()}%")
        )

    if min_price is not None:
        query = query.where(Product.price >= min_price)

    if max_price is not None:
        query = query.where(Product.price <= max_price)

    if sort_by == "price-low":
        query = query.order_by(Product.price.asc())
    elif sort_by == "price-high":
        query = query.order_by(Product.price.desc())
    elif sort_by == "rating":
        query = query.order_by(Product.rating.desc())
    else:
        query = query.order_by(Product.created_at.desc())

    return db.scalars(query).unique().all()


@router.get("/slug/{slug}", response_model=ProductRead)
def get_product_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):
    product = db.scalar(
        product_query().where(
            Product.slug == slug,
            Product.is_active.is_(True),
        )
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    return product


@router.patch("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    product = db.scalar(
        product_query().where(Product.id == product_id)
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    update_data = product_in.model_dump(
        exclude_unset=True,
        exclude={"images"},
    )

    if "category_id" in update_data:
        category = db.get(Category, update_data["category_id"])

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found.",
            )

    if "slug" in update_data:
        existing_product = db.scalar(
            select(Product).where(
                Product.slug == update_data["slug"],
                Product.id != product_id,
            )
        )

        if existing_product:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A product with this slug already exists.",
            )

    for field, value in update_data.items():
        setattr(product, field, value)

    if product_in.images is not None:
        product.images.clear()

        product.images = [
            ProductImage(**image.model_dump())
            for image in product_in.images
        ]

    db.commit()

    return db.scalar(
        product_query().where(Product.id == product_id)
    )


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def deactivate_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    product = db.get(Product, product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    product.is_active = False
    db.commit()
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.db.session import get_db
from app.models.category import Category
from app.models.user import User
from app.schemas.category import (
    CategoryCreate,
    CategoryRead,
    CategoryUpdate,
)


router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


@router.post(
    "/",
    response_model=CategoryRead,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    category_in: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    existing_category = db.scalar(
        select(Category).where(
            or_(
                Category.name == category_in.name,
                Category.slug == category_in.slug,
            )
        )
    )

    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A category with this name or slug already exists.",
        )

    category = Category(**category_in.model_dump())

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@router.get("/", response_model=list[CategoryRead])
def list_active_categories(
    db: Session = Depends(get_db),
):
    query = (
        select(Category)
        .where(Category.is_active.is_(True))
        .order_by(Category.name)
    )

    return db.scalars(query).all()


@router.get("/admin/all", response_model=list[CategoryRead])
def list_all_categories_for_admin(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    query = select(Category).order_by(Category.name)

    return db.scalars(query).all()


@router.patch("/{category_id}", response_model=CategoryRead)
def update_category(
    category_id: int,
    category_in: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    category = db.get(Category, category_id)

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found.",
        )

    update_data = category_in.model_dump(exclude_unset=True)

    if "name" in update_data:
        existing_name = db.scalar(
            select(Category).where(
                Category.name == update_data["name"],
                Category.id != category_id,
            )
        )

        if existing_name:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A category with this name already exists.",
            )

    if "slug" in update_data:
        existing_slug = db.scalar(
            select(Category).where(
                Category.slug == update_data["slug"],
                Category.id != category_id,
            )
        )

        if existing_slug:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A category with this slug already exists.",
            )

    for field, value in update_data.items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)

    return category


@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def deactivate_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    category = db.get(Category, category_id)

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found.",
        )

    category.is_active = False
    db.commit()
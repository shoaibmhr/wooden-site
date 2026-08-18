from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryRead


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
def list_categories(
    include_inactive: bool = False,
    db: Session = Depends(get_db),
):
    query = select(Category).order_by(Category.name)

    if not include_inactive:
        query = query.where(Category.is_active.is_(True))

    return db.scalars(query).all()
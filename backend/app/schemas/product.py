from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.category import CategoryRead


class ProductImageCreate(BaseModel):
    image_url: str = Field(min_length=1)
    position: int = Field(default=0, ge=0)


class ProductImageRead(ProductImageCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ProductBase(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(
        min_length=2,
        max_length=255,
        pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
    )
    category_id: int = Field(gt=0)
    description: str = Field(min_length=10)
    price: Decimal = Field(gt=0, max_digits=12, decimal_places=2)
    original_price: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    rating: Decimal = Field(
        default=Decimal("0.00"),
        ge=0,
        le=5,
        max_digits=3,
        decimal_places=2,
    )
    review_count: int = Field(default=0, ge=0)

    stock_quantity: int = Field(default=0, ge=0)
    low_stock_threshold: int = Field(default=3, ge=0)

    primary_image_url: str = Field(min_length=1)
    is_active: bool = True


class ProductCreate(ProductBase):
    images: list[ProductImageCreate] = Field(default_factory=list)


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=255)
    slug: str | None = Field(
        default=None,
        min_length=2,
        max_length=255,
        pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
    )
    category_id: int | None = Field(default=None, gt=0)
    description: str | None = Field(default=None, min_length=10)
    price: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    original_price: Decimal | None = Field(
        default=None,
        gt=0,
        max_digits=12,
        decimal_places=2,
    )
    rating: Decimal | None = Field(
        default=None,
        ge=0,
        le=5,
        max_digits=3,
        decimal_places=2,
    )
    review_count: int | None = Field(default=None, ge=0)

    stock_quantity: int | None = Field(default=None, ge=0)
    low_stock_threshold: int | None = Field(default=None, ge=0)

    primary_image_url: str | None = Field(default=None, min_length=1)
    is_active: bool | None = None
    images: list[ProductImageCreate] | None = None


class ProductRead(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    category: CategoryRead
    images: list[ProductImageRead]

    model_config = ConfigDict(from_attributes=True)
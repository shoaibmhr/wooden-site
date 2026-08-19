from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.order import (
    OrderStatus,
    PaymentMethod,
    PaymentStatus,
)


class OrderItemCreate(BaseModel):
    product_id: int = Field(gt=0)
    quantity: int = Field(gt=0, le=100)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=120)
    customer_email: EmailStr
    customer_phone: str = Field(min_length=7, max_length=30)

    shipping_address: str = Field(min_length=10, max_length=1000)
    city: str = Field(min_length=2, max_length=100)
    notes: str | None = Field(default=None, max_length=2000)

    payment_method: PaymentMethod = PaymentMethod.CASH_ON_DELIVERY
    payment_reference: str | None = Field(
        default=None,
        max_length=255,
    )

    items: list[OrderItemCreate] = Field(min_length=1)


class OrderItemRead(BaseModel):
    id: int
    product_id: int | None
    product_name: str
    product_price: Decimal
    quantity: int
    line_total: Decimal

    model_config = ConfigDict(from_attributes=True)


class OrderRead(BaseModel):
    id: int
    order_number: str
    user_id: int | None

    customer_name: str
    customer_email: EmailStr
    customer_phone: str

    shipping_address: str
    city: str
    notes: str | None

    subtotal: Decimal
    delivery_charge: Decimal
    total_amount: Decimal

    status: OrderStatus
    payment_status: PaymentStatus
    payment_method: PaymentMethod
    payment_reference: str | None

    created_at: datetime
    updated_at: datetime

    items: list[OrderItemRead]

    model_config = ConfigDict(from_attributes=True)
class OrderTrackingRequest(BaseModel):
    order_number: str = Field(min_length=8, max_length=30)
    customer_email: EmailStr
    customer_phone: str = Field(min_length=7, max_length=30)


class OrderTrackingRead(BaseModel):
    order_number: str

    status: OrderStatus
    payment_status: PaymentStatus
    payment_method: PaymentMethod

    subtotal: Decimal
    delivery_charge: Decimal
    total_amount: Decimal

    created_at: datetime
    updated_at: datetime

    items: list[OrderItemRead]

    model_config = ConfigDict(from_attributes=True)


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


class PaymentStatusUpdate(BaseModel):
    payment_status: PaymentStatus
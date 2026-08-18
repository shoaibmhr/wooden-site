from datetime import datetime, timezone
from decimal import Decimal
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.deps import require_admin
from app.db.session import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import (
    OrderCreate,
    OrderRead,
    OrderStatusUpdate,
    PaymentStatusUpdate,
)


router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


def order_query():
    return select(Order).options(
        selectinload(Order.items),
    )


def generate_order_number(db: Session) -> str:
    for _ in range(10):
        order_number = (
            f"AW-{datetime.now(timezone.utc):%Y%m%d}-"
            f"{uuid4().hex[:8].upper()}"
        )

        existing_order = db.scalar(
            select(Order.id).where(
                Order.order_number == order_number
            )
        )

        if not existing_order:
            return order_number

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Could not generate a unique order number.",
    )


# Customer website: create an order
@router.post(
    "/",
    response_model=OrderRead,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
):
    product_ids = [item.product_id for item in order_in.items]

    if len(product_ids) != len(set(product_ids)):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Each product can only appear once in an order.",
        )

    products = db.scalars(
        select(Product).where(
            Product.id.in_(product_ids),
            Product.is_active.is_(True),
        )
    ).all()

    products_by_id = {
        product.id: product
        for product in products
    }

    missing_product_ids = [
        product_id
        for product_id in product_ids
        if product_id not in products_by_id
    ]

    if missing_product_ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=(
                "One or more products do not exist or are unavailable: "
                f"{missing_product_ids}"
            ),
        )

    subtotal = Decimal("0.00")
    order_items = []

    for item_in in order_in.items:
        product = products_by_id[item_in.product_id]
        line_total = product.price * item_in.quantity
        subtotal += line_total

        order_items.append(
            OrderItem(
                product_id=product.id,
                product_name=product.name,
                product_price=product.price,
                quantity=item_in.quantity,
                line_total=line_total,
            )
        )

    delivery_charge = Decimal("0.00")
    total_amount = subtotal + delivery_charge

    order_data = order_in.model_dump(exclude={"items"})
    order_data["customer_email"] = (
        order_data["customer_email"].lower()
    )

    order = Order(
        **order_data,
        order_number=generate_order_number(db),
        subtotal=subtotal,
        delivery_charge=delivery_charge,
        total_amount=total_amount,
        items=order_items,
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    return db.scalar(
        order_query().where(Order.id == order.id)
    )


# Admin dashboard: all orders
@router.get(
    "/",
    response_model=list[OrderRead],
)
def list_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    query = order_query().order_by(
        Order.created_at.desc()
    )

    return db.scalars(query).unique().all()


# Admin dashboard: one order with items
@router.get(
    "/{order_id}",
    response_model=OrderRead,
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    order = db.scalar(
        order_query().where(Order.id == order_id)
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found.",
        )

    return order


# Admin dashboard: order delivery status update
@router.patch(
    "/{order_id}/status",
    response_model=OrderRead,
)
def update_order_status(
    order_id: int,
    status_in: OrderStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    order = db.scalar(
        order_query().where(Order.id == order_id)
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found.",
        )

    order.status = status_in.status

    db.commit()
    db.refresh(order)

    return order


# Admin dashboard: payment status update
@router.patch(
    "/{order_id}/payment-status",
    response_model=OrderRead,
)
def update_payment_status(
    order_id: int,
    payment_in: PaymentStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    order = db.scalar(
        order_query().where(Order.id == order_id)
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found.",
        )

    order.payment_status = payment_in.payment_status

    db.commit()
    db.refresh(order)

    return order
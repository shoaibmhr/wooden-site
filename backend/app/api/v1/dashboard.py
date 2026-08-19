from decimal import Decimal

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.db.session import get_db
from app.models.category import Category
from app.models.contact_inquiry import ContactInquiry
from app.models.order import (
    Order,
    OrderStatus,
    PaymentStatus,
)
from app.models.product import Product
from app.models.user import User, UserRole
from app.schemas.dashboard import DashboardStatsRead


router = APIRouter(
    prefix="/dashboard",
    tags=["Admin Dashboard"],
)


@router.get(
    "/stats",
    response_model=DashboardStatsRead,
)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    total_products = db.scalar(
        select(func.count()).select_from(Product)
    ) or 0

    active_products = db.scalar(
        select(func.count())
        .select_from(Product)
        .where(Product.is_active.is_(True))
    ) or 0

    low_stock_products = db.scalar(
        select(func.count())
        .select_from(Product)
        .where(
            Product.is_active.is_(True),
            Product.stock_quantity > 0,
            Product.stock_quantity <= Product.low_stock_threshold,
        )
    ) or 0

    out_of_stock_products = db.scalar(
        select(func.count())
        .select_from(Product)
        .where(
            Product.is_active.is_(True),
            Product.stock_quantity == 0,
        )
    ) or 0

    total_categories = db.scalar(
        select(func.count()).select_from(Category)
    ) or 0

    active_categories = db.scalar(
        select(func.count())
        .select_from(Category)
        .where(Category.is_active.is_(True))
    ) or 0

    total_customers = db.scalar(
        select(func.count())
        .select_from(User)
        .where(User.role == UserRole.CUSTOMER)
    ) or 0

    total_inquiries = db.scalar(
        select(func.count()).select_from(ContactInquiry)
    ) or 0

    new_inquiries = db.scalar(
        select(func.count())
        .select_from(ContactInquiry)
        .where(ContactInquiry.status == "new")
    ) or 0

    total_orders = db.scalar(
        select(func.count()).select_from(Order)
    ) or 0

    pending_orders = db.scalar(
        select(func.count())
        .select_from(Order)
        .where(Order.status == OrderStatus.PENDING)
    ) or 0

    total_order_value = db.scalar(
        select(func.coalesce(func.sum(Order.total_amount), 0))
        .where(Order.status != OrderStatus.CANCELLED)
    ) or Decimal("0.00")

    paid_revenue = db.scalar(
        select(func.coalesce(func.sum(Order.total_amount), 0))
        .where(
            Order.status != OrderStatus.CANCELLED,
            Order.payment_status == PaymentStatus.PAID,
        )
    ) or Decimal("0.00")

    return DashboardStatsRead(
        total_products=total_products,
        active_products=active_products,
        low_stock_products=low_stock_products,
        out_of_stock_products=out_of_stock_products,
        total_categories=total_categories,
        active_categories=active_categories,
        total_customers=total_customers,
        total_inquiries=total_inquiries,
        new_inquiries=new_inquiries,
        total_orders=total_orders,
        pending_orders=pending_orders,
        total_order_value=total_order_value,
        paid_revenue=paid_revenue,
    )
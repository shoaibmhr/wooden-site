from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.db.session import get_db
from app.models.category import Category
from app.models.contact_inquiry import ContactInquiry
from app.models.order import Order, OrderStatus
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

    return DashboardStatsRead(
        total_products=total_products,
        active_products=active_products,
        total_categories=total_categories,
        active_categories=active_categories,
        total_customers=total_customers,
        total_inquiries=total_inquiries,
        new_inquiries=new_inquiries,
        total_orders=total_orders,
        pending_orders=pending_orders,
    )
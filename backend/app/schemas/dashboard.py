from decimal import Decimal

from pydantic import BaseModel


class DashboardStatsRead(BaseModel):
    total_products: int
    active_products: int

    low_stock_products: int
    out_of_stock_products: int

    total_categories: int
    active_categories: int

    total_customers: int

    total_inquiries: int
    new_inquiries: int

    total_orders: int
    pending_orders: int

    total_order_value: Decimal
    paid_revenue: Decimal
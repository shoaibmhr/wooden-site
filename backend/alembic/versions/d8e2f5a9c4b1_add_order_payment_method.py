"""add order payment method

Revision ID: d8e2f5a9c4b1
Revises: b6e1c3d4a5f6
Create Date: 2026-08-19
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d8e2f5a9c4b1"
down_revision: Union[str, Sequence[str], None] = "b6e1c3d4a5f6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


payment_method_enum = sa.Enum(
    "CASH_ON_DELIVERY",
    "BANK_TRANSFER",
    name="payment_method",
)


def upgrade() -> None:
    payment_method_enum.create(op.get_bind(), checkfirst=True)

    op.add_column(
        "orders",
        sa.Column(
            "payment_method",
            payment_method_enum,
            nullable=False,
            server_default="CASH_ON_DELIVERY",
        ),
    )

    op.add_column(
        "orders",
        sa.Column(
            "payment_reference",
            sa.String(length=255),
            nullable=True,
        ),
    )

    op.create_index(
        op.f("ix_orders_payment_method"),
        "orders",
        ["payment_method"],
        unique=False,
    )

    op.alter_column(
        "orders",
        "payment_method",
        server_default=None,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_orders_payment_method"),
        table_name="orders",
    )
    op.drop_column("orders", "payment_reference")
    op.drop_column("orders", "payment_method")

    payment_method_enum.drop(op.get_bind(), checkfirst=True)
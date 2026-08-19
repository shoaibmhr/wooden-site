"""add product inventory fields

Revision ID: b6e1c3d4a5f6
Revises: 75cafa77d4b0
Create Date: 2026-08-19
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b6e1c3d4a5f6"
down_revision: Union[str, Sequence[str], None] = "75cafa77d4b0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "products",
        sa.Column(
            "stock_quantity",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
    )
    op.add_column(
        "products",
        sa.Column(
            "low_stock_threshold",
            sa.Integer(),
            nullable=False,
            server_default="3",
        ),
    )

    op.alter_column("products", "stock_quantity", server_default=None)
    op.alter_column("products", "low_stock_threshold", server_default=None)


def downgrade() -> None:
    op.drop_column("products", "low_stock_threshold")
    op.drop_column("products", "stock_quantity")
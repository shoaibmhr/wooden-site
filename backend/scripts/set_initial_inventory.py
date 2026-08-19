from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.product import Product


DEFAULT_STOCK_QUANTITY = 10
DEFAULT_LOW_STOCK_THRESHOLD = 3


def set_initial_inventory():
    db = SessionLocal()

    try:
        products = db.scalars(
            select(Product).order_by(Product.id)
        ).all()

        if not products:
            print("No products found. Run seed_data.py first.")
            return

        updated_count = 0

        for product in products:
            if product.stock_quantity == 0:
                product.stock_quantity = DEFAULT_STOCK_QUANTITY
                updated_count += 1

            product.low_stock_threshold = (
                DEFAULT_LOW_STOCK_THRESHOLD
            )

        db.commit()

        print(
            f"Inventory updated successfully. "
            f"{updated_count} product(s) received "
            f"{DEFAULT_STOCK_QUANTITY} initial stock."
        )

    except Exception as error:
        db.rollback()
        print(f"Inventory update failed: {error}")
        raise

    finally:
        db.close()


if __name__ == "__main__":
    set_initial_inventory()
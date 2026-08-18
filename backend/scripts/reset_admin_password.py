from getpass import getpass

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.user import User, UserRole


def main():
    email = input(
        "Admin email [admin@ashtech.com]: "
    ).strip().lower() or "admin@ashtech.com"

    db = SessionLocal()

    try:
        user = db.scalar(
            select(User).where(
                User.email == email,
                User.role == UserRole.ADMIN,
            )
        )

        if not user:
            print("Admin user not found.")
            return

        new_password = getpass("New password: ")
        confirm_password = getpass("Confirm password: ")

        if new_password != confirm_password:
            print("Passwords do not match.")
            return

        if len(new_password) < 8:
            print("Password must contain at least 8 characters.")
            return

        user.hashed_password = hash_password(new_password)
        db.commit()

        print("Admin password updated successfully.")

    finally:
        db.close()


if __name__ == "__main__":
    main()
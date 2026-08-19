import secrets

from fastapi import APIRouter, Depends, Header, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.config import settings
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.auth import AdminBootstrapCreate, Token
from app.schemas.user import CustomerRegister, UserRead


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/bootstrap-admin",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
)
def bootstrap_first_admin(
    admin_in: AdminBootstrapCreate,
    db: Session = Depends(get_db),
    x_admin_bootstrap_secret: str | None = Header(default=None),
):
    if (
        not settings.ADMIN_BOOTSTRAP_SECRET
        or not x_admin_bootstrap_secret
        or not secrets.compare_digest(
            x_admin_bootstrap_secret,
            settings.ADMIN_BOOTSTRAP_SECRET,
        )
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid bootstrap secret.",
        )

    existing_admin = db.scalar(
        select(User).where(User.role == UserRole.ADMIN)
    )

    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="An admin account already exists.",
        )

    normalized_email = admin_in.email.lower()

    existing_user = db.scalar(
        select(User).where(User.email == normalized_email)
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists.",
        )

    admin = User(
        full_name=admin_in.full_name,
        email=normalized_email,
        hashed_password=hash_password(admin_in.password),
        role=UserRole.ADMIN,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return admin


@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
)
def register_customer(
    customer_in: CustomerRegister,
    db: Session = Depends(get_db),
):
    normalized_email = customer_in.email.lower()

    existing_user = db.scalar(
        select(User).where(User.email == normalized_email)
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists.",
        )

    customer = User(
        full_name=customer_in.full_name,
        email=normalized_email,
        hashed_password=hash_password(customer_in.password),
        role=UserRole.CUSTOMER,
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    email = form_data.username.strip().lower()

    user = db.scalar(
        select(User).where(User.email == email)
    )

    invalid_credentials = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not user or not verify_password(
        form_data.password,
        user.hashed_password,
    ):
        raise invalid_credentials

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account is inactive.",
        )

    if user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access is required.",
        )

    access_token = create_access_token(
        subject=str(user.id),
        role=user.role.value,
    )

    return Token(access_token=access_token)


@router.get("/me", response_model=UserRead)
def read_current_user(
    current_user: User = Depends(get_current_user),
):
    return current_user
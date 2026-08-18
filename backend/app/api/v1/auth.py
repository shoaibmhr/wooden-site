from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.db.session import get_db
from app.models.user import User, UserRole
from app.schemas.auth import AdminBootstrapCreate, Token
from app.schemas.user import UserRead


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
):
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
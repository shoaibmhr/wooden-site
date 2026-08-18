from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.db.session import get_db
from app.models.contact_inquiry import ContactInquiry
from app.models.user import User
from app.schemas.contact_inquiry import (
    ContactInquiryCreate,
    ContactInquiryRead,
    ContactInquiryStatusUpdate,
)


router = APIRouter(
    prefix="/contact-inquiries",
    tags=["Contact Inquiries"],
)


# Website contact form: public endpoint
@router.post(
    "/",
    response_model=ContactInquiryRead,
    status_code=status.HTTP_201_CREATED,
)
def create_contact_inquiry(
    inquiry_in: ContactInquiryCreate,
    db: Session = Depends(get_db),
):
    inquiry = ContactInquiry(**inquiry_in.model_dump())

    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    return inquiry


# Admin dashboard: all received messages
@router.get(
    "/",
    response_model=list[ContactInquiryRead],
)
def list_contact_inquiries(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    query = select(ContactInquiry).order_by(
        ContactInquiry.created_at.desc()
    )

    return db.scalars(query).all()


# Admin dashboard: change message status
@router.patch(
    "/{inquiry_id}/status",
    response_model=ContactInquiryRead,
)
def update_contact_inquiry_status(
    inquiry_id: int,
    status_in: ContactInquiryStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    inquiry = db.get(ContactInquiry, inquiry_id)

    if not inquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact inquiry not found.",
        )

    inquiry.status = status_in.status

    db.commit()
    db.refresh(inquiry)

    return inquiry
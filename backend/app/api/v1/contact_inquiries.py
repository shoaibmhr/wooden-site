from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.contact_inquiry import ContactInquiry
from app.schemas.contact_inquiry import (
    ContactInquiryCreate,
    ContactInquiryRead,
)


router = APIRouter(
    prefix="/contact-inquiries",
    tags=["Contact Inquiries"],
)


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
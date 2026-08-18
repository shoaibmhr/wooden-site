from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


InquiryStatus = Literal["new", "read", "resolved", "archived"]


class ContactInquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    message: str = Field(min_length=10, max_length=5000)


class ContactInquiryStatusUpdate(BaseModel):
    status: InquiryStatus


class ContactInquiryRead(ContactInquiryCreate):
    id: int
    status: InquiryStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
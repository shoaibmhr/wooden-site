from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.categories import router as categories_router
from app.api.v1.contact_inquiries import router as contact_inquiries_router
from app.api.v1.products import router as products_router


api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(categories_router)
api_router.include_router(contact_inquiries_router)
api_router.include_router(products_router)
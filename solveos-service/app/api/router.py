from fastapi import APIRouter

from app.modules.authentication.adapters.inbound.http.authentication_router import router as auth_router

# API v1 router - aggregates all module routers
api_router = APIRouter()

api_router.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

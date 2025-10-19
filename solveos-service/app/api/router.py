from fastapi import APIRouter
from app.modules.authentication.adapters.inbound.http.routes import router as auth_router

# Aggregate all module routers
api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])

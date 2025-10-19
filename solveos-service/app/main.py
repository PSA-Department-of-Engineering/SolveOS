from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.api.router import api_router
from app.api.health import router as health_router
from app.config import get_settings
from app.modules.authentication import di as auth_di

def create_application() -> FastAPI:
    """Application factory."""
    settings = get_settings()
    
    application = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="ServiceOS API with OAuth2 authentication.",
        debug=settings.DEBUG,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )
    
    # Dependency Injection
    auth_di.configure(application)

    # Middleware
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Routers
    application.include_router(health_router)
    application.include_router(api_router, prefix="/api/v1")
    @application.get("/", tags=["Root"])
    async def root() -> dict[str, str]:
        """API root endpoint with quick links"""
        return {
            "message": f"Welcome to {settings.APP_NAME}",
            "version": settings.APP_VERSION,
            "docs": "/docs",
            "redoc": "/redoc",
            "openapi": "/openapi.json",
            "health": "/health"
        }

    # Swagger / OpenAPI customization
    def custom_openapi():
        if application.openapi_schema:
            return application.openapi_schema
        
        openapi_schema = get_openapi(
            title=settings.APP_NAME,
            version=settings.APP_VERSION,
            description=application.description,
            routes=application.routes,
        )

        openapi_schema["components"]["securitySchemes"] = {
            "OAuth2PasswordBearer": {
                "type": "oauth2",
                "flows": {
                    "password": {
                        "tokenUrl": "/api/v1/auth/login",
                        "scopes": {}
                    }
                }
            }
        }
        application.openapi_schema = openapi_schema
        return application.openapi_schema
    application.openapi = custom_openapi
    return application

app = create_application()

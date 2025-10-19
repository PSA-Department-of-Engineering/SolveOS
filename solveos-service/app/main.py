from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from app.api.router import api_router
from app.api.health import router as health_router
from app.shared.infrastructure.config import get_settings


def create_application() -> FastAPI:
    """
    Application factory.
    Creates and configures the FastAPI application.
    """
    settings = get_settings()
    
    application = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="""
## SolveOS Business Management API

A modern API for managing service-oriented business operations.

### Features
- 🔐 **OAuth2 + JWT Authentication** - Secure token-based authentication
- 📦 **Clean Architecture** - Hexagonal pattern with clear separation of concerns
- 📝 **Auto-generated Documentation** - OpenAPI/Swagger specification
- 🎯 **Type-Safe** - Fully typed with Python type hints and Pydantic

### Architecture
Built using **Clean Architecture** principles with a **modular monolith** approach:
- **Domain Layer**: Pure business logic (entities, ports)
- **Application Layer**: Use cases (commands, queries)
- **Adapters Layer**: External implementations (HTTP, database, security)

### Authentication
This API uses OAuth2 with JWT tokens. To authenticate:
1. Click the **Authorize** button (🔓) below
2. Use test credentials: `admin@solveos.com` / `secret`
3. The token will be automatically included in requests

### OpenAPI Spec
- **Swagger UI**: [/docs](/docs) (you are here)
- **ReDoc**: [/redoc](/redoc)
- **OpenAPI JSON**: [/openapi.json](/openapi.json)

You can generate TypeScript types from the OpenAPI spec for your frontend.
        """,
        debug=settings.DEBUG,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )
    
    # Configure CORS
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include routers
    application.include_router(health_router)
    application.include_router(api_router, prefix="/api/v1")
    
    # Root endpoint
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
    
    # Customize OpenAPI schema
    def custom_openapi():
        if application.openapi_schema:
            return application.openapi_schema
        
        openapi_schema = get_openapi(
            title=settings.APP_NAME,
            version=settings.APP_VERSION,
            description=application.description,
            routes=application.routes,
        )
        
        # Add security scheme for Swagger UI
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


# Create application instance
app = create_application()

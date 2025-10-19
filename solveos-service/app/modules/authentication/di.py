"""
Dependency Injection configuration for Authentication module.

This module is responsible for wiring together all authentication components:
- Infrastructure services
- Repositories
- Use cases
- HTTP adapter providers
"""

from fastapi import FastAPI

from app.modules.authentication.application.use_cases import AuthenticationService
from app.modules.authentication.adapters.outbound import InMemoryPersistenceAdapter
from app.modules.authentication.adapters.inbound.http import providers as auth_providers
from app.modules.authentication.adapters.inbound.http.utils import CookieManager

from app.infrastructure import PasswordService, TokenService
from app.config import get_settings


def configure(app: FastAPI) -> None:
    """Configure dependency injection for authentication module."""
    settings = get_settings()
    
    # Create singleton instances of infrastructure services
    password_service = PasswordService()
    token_service = TokenService(
        secret_key=settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    cookie_manager = CookieManager()
    
    # Create singleton instances of repositories (driven adapters)
    user_repository = InMemoryPersistenceAdapter()
    
    # Create the use case / application service (implements the inbound port)
    authentication_service = AuthenticationService(
        user_persistence=user_repository,
        password_service=password_service,
        token_service=token_service
    )
    
    # Override dependency providers with actual implementations
    app.dependency_overrides[auth_providers.get_authentication_port] = lambda: authentication_service
    app.dependency_overrides[auth_providers.get_token_generator] = lambda: token_service
    app.dependency_overrides[auth_providers.get_cookie_manager] = lambda: cookie_manager

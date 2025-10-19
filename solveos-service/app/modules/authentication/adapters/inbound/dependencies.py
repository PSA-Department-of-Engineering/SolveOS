from fastapi import Depends, HTTPException, status, Cookie
from typing import Annotated

from app.modules.authentication.application.commands.login_user import LoginUserHandler
from app.modules.authentication.application.queries.get_current_user import GetCurrentUserHandler
from app.modules.authentication.adapters.outbound.repositories.in_memory_user_repository import InMemoryUserRepository
from app.modules.authentication.adapters.outbound.security.bcrypt_password_hasher import BcryptPasswordHasher
from app.modules.authentication.adapters.outbound.security.jwt_token_generator import JWTTokenGenerator
from app.shared.infrastructure.config import get_settings


def get_user_repository() -> InMemoryUserRepository:
    """Dependency: Get user repository instance"""
    return InMemoryUserRepository()


def get_password_hasher() -> BcryptPasswordHasher:
    """Dependency: Get password hasher instance"""
    return BcryptPasswordHasher()


def get_token_generator() -> JWTTokenGenerator:
    """Dependency: Get token generator instance"""
    settings = get_settings()
    return JWTTokenGenerator(
        secret_key=settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


def get_login_handler(
    user_repository: InMemoryUserRepository = Depends(get_user_repository),
    password_hasher: BcryptPasswordHasher = Depends(get_password_hasher),
    token_generator: JWTTokenGenerator = Depends(get_token_generator)
) -> LoginUserHandler:
    """Dependency: Get login use case handler"""
    settings = get_settings()
    return LoginUserHandler(
        user_repository=user_repository,
        password_hasher=password_hasher,
        token_generator=token_generator,
        access_token_expire_minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )


def get_current_user_handler(
    user_repository: InMemoryUserRepository = Depends(get_user_repository),
    token_generator: JWTTokenGenerator = Depends(get_token_generator)
) -> GetCurrentUserHandler:
    """Dependency: Get current user query handler"""
    return GetCurrentUserHandler(
        user_repository=user_repository,
        token_generator=token_generator
    )


def get_current_user_token(solveos_token: Annotated[str | None, Cookie()] = None) -> str:
    """
    Dependency: Extract token from solveos_token cookie.
    Raises 401 if cookie is missing or empty.
    """
    if not solveos_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated - cookie missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return solveos_token

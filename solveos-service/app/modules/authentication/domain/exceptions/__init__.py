"""Domain exceptions for authentication module."""

from .authentication_exceptions import (
    AuthenticationError,
    InvalidCredentialsError,
    UserDisabledError,
    InvalidTokenError,
    UserNotFoundError,
)

__all__ = [
    "AuthenticationError",
    "InvalidCredentialsError",
    "UserDisabledError",
    "InvalidTokenError",
    "UserNotFoundError",
]

"""Exception handlers for authentication domain exceptions."""

from fastapi import HTTPException, status
from app.modules.authentication.domain.exceptions import *

def handle_authentication_exceptions(error: AuthenticationError) -> HTTPException:
    """
    Convert domain exceptions to HTTP exceptions.
    """
    if isinstance(error, InvalidCredentialsError):
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=error.message,
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if isinstance(error, UserDisabledError):
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error.message,
        )
    
    if isinstance(error, (InvalidTokenError, UserNotFoundError)):
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=error.message,
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="An authentication error occurred",
    )

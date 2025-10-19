"""Token extraction utility for authentication."""

from fastapi import HTTPException, status, Cookie
from typing import Annotated

def get_current_user_token(
    solveos_token: Annotated[str | None, Cookie()] = None
) -> str:
    """Extract and validate authentication token from cookie."""
    if not solveos_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated - cookie missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return solveos_token

"""Cookie management utility for authentication HTTP adapter."""

from fastapi import Response
from app.config import get_settings

class CookieManager:
    """Handles HTTP cookie operations for authentication."""
    
    COOKIE_NAME = "solveos_token"
    
    def __init__(self):
        self._settings = get_settings()
    
    def set_auth_cookie(self, response: Response, token: str) -> None:
        """Set authentication cookie on response."""
        response.set_cookie(
            key=self.COOKIE_NAME,
            value=token,
            httponly=True,
            secure=not self._settings.DEBUG,  # True in production (HTTPS)
            samesite="lax",
            max_age=self._settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            path="/",
        )
    
    def clear_auth_cookie(self, response: Response) -> None:
        """Clear authentication cookie from response."""
        response.set_cookie(
            key=self.COOKIE_NAME,
            value="",
            httponly=True,
            secure=not self._settings.DEBUG,
            samesite="lax",
            max_age=0,  # Expire immediately
            path="/",
        )

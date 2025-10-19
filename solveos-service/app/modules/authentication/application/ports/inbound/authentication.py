"""Inbound port for authentication operations."""

from abc import ABC, abstractmethod
from app.modules.authentication.domain.entities.user import User

class Authentication(ABC):
    """Interface defining what the authentication module does."""
    
    @abstractmethod
    def login(self, email: str, password: str) -> User:
        """Authenticate a user and return the authenticated user entity."""
        pass
    
    @abstractmethod
    def get_current_user(self, token: str) -> User:
        """Get current authenticated user from token."""
        pass

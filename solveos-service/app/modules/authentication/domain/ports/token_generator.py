from abc import ABC, abstractmethod
from datetime import timedelta


class TokenGenerator(ABC):
    """
    Port (interface) for JWT token generation and validation.
    """
    
    @abstractmethod
    def create_access_token(self, subject: str, expires_delta: timedelta | None = None) -> str:
        """Create a JWT access token"""
        pass
    
    @abstractmethod
    def decode_token(self, token: str) -> dict[str, str]:
        """Decode and validate JWT token"""
        pass

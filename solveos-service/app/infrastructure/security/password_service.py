"""Password hashing service."""

from passlib.context import CryptContext


class PasswordService:
    """Handles password hashing and verification using bcrypt."""
    
    def __init__(self):
        self._pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    def hash(self, plain_password: str) -> str:
        """Hash a plain text password."""
        return self._pwd_context.hash(plain_password)
    
    def verify(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against a hash."""
        return self._pwd_context.verify(plain_password, hashed_password)

from passlib.context import CryptContext

from app.modules.authentication.domain.ports.password_hasher import PasswordHasher


class BcryptPasswordHasher(PasswordHasher):
    """
    Bcrypt implementation of PasswordHasher port.
    Outbound adapter using passlib.
    """
    
    def __init__(self):
        self._pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    def hash(self, plain_password: str) -> str:
        """Hash a plain text password using bcrypt"""
        return self._pwd_context.hash(plain_password)
    
    def verify(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against bcrypt hash"""
        return self._pwd_context.verify(plain_password, hashed_password)

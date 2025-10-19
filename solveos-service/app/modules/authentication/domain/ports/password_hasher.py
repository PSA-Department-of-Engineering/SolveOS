from abc import ABC, abstractmethod


class PasswordHasher(ABC):
    """
    Port (interface) for password hashing.
    Domain defines what's needed, infrastructure provides the implementation.
    """
    
    @abstractmethod
    def hash(self, plain_password: str) -> str:
        """Hash a plain text password"""
        pass
    
    @abstractmethod
    def verify(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against a hash"""
        pass

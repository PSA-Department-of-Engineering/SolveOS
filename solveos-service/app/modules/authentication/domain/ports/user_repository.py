from abc import ABC, abstractmethod
from typing import Optional

from app.modules.authentication.domain.entities.user import User


class UserRepository(ABC):
    """
    Port (interface) for user persistence.
    Domain layer defines the contract, infrastructure implements it.
    """
    
    @abstractmethod
    def find_by_email(self, email: str) -> Optional[User]:
        """Find user by email address"""
        pass
    
    @abstractmethod
    def save(self, user: User) -> User:
        """Save or update user"""
        pass
    
    @abstractmethod
    def exists_by_email(self, email: str) -> bool:
        """Check if user exists by email"""
        pass

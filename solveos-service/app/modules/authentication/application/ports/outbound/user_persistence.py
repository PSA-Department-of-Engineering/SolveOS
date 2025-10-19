"""Outbound port for user persistence."""

from abc import ABC, abstractmethod
from typing import Optional
from app.modules.authentication.domain.entities.user import User

class UserPersistence(ABC):
    """Interface defining what the application needs for user persistence."""
    
    @abstractmethod
    def find_by_email(self, email: str) -> Optional[User]:
        """Find user by email address."""
        pass

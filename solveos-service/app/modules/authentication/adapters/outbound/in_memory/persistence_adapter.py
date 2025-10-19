"""In-memory persistence adapter for authentication module."""

from typing import Optional
from app.modules.authentication.domain.entities.user import User
from app.modules.authentication.application.ports.outbound import UserPersistence
from .user_storage import UserStorage

class InMemoryPersistenceAdapter(UserPersistence):
    """In-memory persistence adapter for authentication module."""
    
    def __init__(self):
        """Initialize the adapter with its storage components."""
        self._user_storage = UserStorage()
    
    def find_by_email(self, email: str) -> Optional[User]:
        """Find user by email address."""
        return self._user_storage.find_by_email(email)

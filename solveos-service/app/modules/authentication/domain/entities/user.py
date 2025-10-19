from dataclasses import dataclass
from datetime import datetime


@dataclass
class User:
    """
    User domain entity.
    Pure business object with no framework dependencies.
    """
    email: str
    hashed_password: str
    full_name: str | None = None
    disabled: bool = False
    created_at: datetime | None = None
    
    def is_active(self) -> bool:
        """Check if user is active"""
        return not self.disabled
    
    def disable(self) -> None:
        """Disable user account"""
        self.disabled = True

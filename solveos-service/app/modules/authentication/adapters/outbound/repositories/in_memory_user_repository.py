from datetime import datetime
from typing import Optional

from app.modules.authentication.domain.entities.user import User
from app.modules.authentication.domain.ports.user_repository import UserRepository

# Hardcoded users database (will be replaced with real DB or mounted from secrets)
USERS_DATA = {
    "admin@solveos.com": {
        "email": "admin@solveos.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "secret"
        "full_name": "Admin User",
        "disabled": False,
        "created_at": datetime.now()
    },
    "user@solveos.com": {
        "email": "user@solveos.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "secret"
        "full_name": "Regular User",
        "disabled": False,
        "created_at": datetime.now()
    }
}


class InMemoryUserRepository(UserRepository):
    """
    In-memory implementation of UserRepository.
    Outbound adapter - implements the domain port.
    """
    
    def __init__(self):
        self._users = USERS_DATA.copy()
    
    def find_by_email(self, email: str) -> Optional[User]:
        """Find user by email"""
        user_data = self._users.get(email)
        if not user_data:
            return None
        
        return User(
            email=user_data["email"],
            hashed_password=user_data["hashed_password"],
            full_name=user_data.get("full_name"),
            disabled=user_data.get("disabled", False),
            created_at=user_data.get("created_at")
        )
    
    def save(self, user: User) -> User:
        """Save or update user"""
        self._users[user.email] = {
            "email": user.email,
            "hashed_password": user.hashed_password,
            "full_name": user.full_name,
            "disabled": user.disabled,
            "created_at": user.created_at or datetime.now()
        }
        return user
    
    def exists_by_email(self, email: str) -> bool:
        """Check if user exists"""
        return email in self._users

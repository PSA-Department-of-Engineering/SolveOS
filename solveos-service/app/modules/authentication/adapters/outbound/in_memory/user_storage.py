"""User-specific storage operations for in-memory implementation."""

import json
from datetime import datetime
from typing import Optional

from app.modules.authentication.domain.entities.user import User
from app.config import get_settings

class UserStorage:
    """Handles user-specific in-memory storage operations."""
    
    def __init__(self):
        """Initialize the in-memory user storage."""
        settings = get_settings()
        self._users = self._load_default_users(settings.DEFAULT_USERS_JSON)
    
    def _load_default_users(self, users_json: str) -> dict:
        """Load default users from JSON string."""
        try:
            users_data = json.loads(users_json)
            # Add created_at timestamp to each user if not present
            for user_data in users_data.values():
                if "created_at" not in user_data:
                    user_data["created_at"] = datetime.now()
            return users_data
        except json.JSONDecodeError as e:
            # Fallback to empty dict if JSON is invalid
            print(f"Warning: Invalid DEFAULT_USERS_JSON configuration: {e}")
            return {}
    
    def find_by_email(self, email: str) -> Optional[User]:
        """Find user by email address."""
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

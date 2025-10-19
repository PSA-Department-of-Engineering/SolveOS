from dataclasses import dataclass

from app.modules.authentication.domain.entities.user import User
from app.modules.authentication.domain.ports.user_repository import UserRepository
from app.modules.authentication.domain.ports.token_generator import TokenGenerator


@dataclass
class GetCurrentUserQuery:
    """Query to get current user from token"""
    token: str


class GetCurrentUserHandler:
    """
    Use case: Get current authenticated user.
    """
    
    def __init__(
        self,
        user_repository: UserRepository,
        token_generator: TokenGenerator
    ):
        self._user_repository = user_repository
        self._token_generator = token_generator
    
    def handle(self, query: GetCurrentUserQuery) -> User:
        """Execute get current user query"""
        # Decode token
        try:
            payload = self._token_generator.decode_token(query.token)
            email: str | None = payload.get("sub")
            if email is None:
                raise ValueError("Invalid token")
        except Exception:
            raise ValueError("Invalid token")
        
        # Find user
        user = self._user_repository.find_by_email(email)
        if not user:
            raise ValueError("User not found")
        
        # Check if active
        if not user.is_active():
            raise ValueError("User account is disabled")
        
        return user

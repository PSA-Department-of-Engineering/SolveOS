"""Authentication use cases implementation."""

from app.modules.authentication.application.ports.inbound import Authentication
from app.modules.authentication.application.ports.outbound import UserPersistence
from app.modules.authentication.domain.exceptions import *
from app.modules.authentication.domain.entities.user import User
from app.infrastructure import PasswordService, TokenService

class AuthenticationService(Authentication):
    """Implementation of authentication use cases."""
    
    def __init__(
        self,
        user_persistence: UserPersistence,
        password_service: PasswordService,
        token_service: TokenService
    ):
        self._user_persistence = user_persistence
        self._password_service = password_service
        self._token_service = token_service
    
    def login(self, email: str, password: str) -> User:
        """Authenticate a user and return the authenticated user entity."""
        user = self._user_persistence.find_by_email(email)
        if not user:
            raise InvalidCredentialsError()

        if not self._password_service.verify(password, user.hashed_password):
            raise InvalidCredentialsError()
        
        if not user.is_active():
            raise UserDisabledError()
        
        return user
    
    def get_current_user(self, token: str) -> User:
        """Get current authenticated user from token."""
        try:
            payload = self._token_service.verify(token)
            email: str | None = payload.get("sub")
            if email is None:
                raise InvalidTokenError()
        except Exception:
            raise InvalidTokenError()

        user = self._user_persistence.find_by_email(email)
        if not user:
            raise UserNotFoundError()

        if not user.is_active():
            raise UserDisabledError()

        return user

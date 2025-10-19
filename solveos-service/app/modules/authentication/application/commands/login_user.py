from dataclasses import dataclass
from datetime import timedelta

from app.modules.authentication.domain.ports.user_repository import UserRepository
from app.modules.authentication.domain.ports.password_hasher import PasswordHasher
from app.modules.authentication.domain.ports.token_generator import TokenGenerator


@dataclass
class LoginCommand:
    """Command to login a user"""
    email: str
    password: str


@dataclass
class LoginResult:
    """Result of login operation"""
    access_token: str
    token_type: str = "bearer"


class LoginUserHandler:
    """
    Use case: Login a user.
    Application layer orchestrates domain objects and ports.
    """
    
    def __init__(
        self,
        user_repository: UserRepository,
        password_hasher: PasswordHasher,
        token_generator: TokenGenerator,
        access_token_expire_minutes: int = 30
    ):
        self._user_repository = user_repository
        self._password_hasher = password_hasher
        self._token_generator = token_generator
        self._access_token_expire_minutes = access_token_expire_minutes
    
    def handle(self, command: LoginCommand) -> LoginResult:
        """Execute login use case"""
        # Find user
        user = self._user_repository.find_by_email(command.email)
        if not user:
            raise ValueError("Invalid credentials")
        
        # Verify password
        if not self._password_hasher.verify(command.password, user.hashed_password):
            raise ValueError("Invalid credentials")
        
        # Check if user is active
        if not user.is_active():
            raise ValueError("User account is disabled")
        
        # Generate token
        access_token_expires = timedelta(minutes=self._access_token_expire_minutes)
        access_token = self._token_generator.create_access_token(
            subject=user.email,
            expires_delta=access_token_expires
        )
        
        return LoginResult(access_token=access_token)

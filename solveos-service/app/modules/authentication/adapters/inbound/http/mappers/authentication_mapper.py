"""Mapper between HTTP DTOs and Domain Entities."""

from app.modules.authentication.domain.entities.user import *
from app.modules.authentication.adapters.inbound.http.dtos import *

class AuthenticationMapper:
    """Maps between HTTP layer and Domain layer."""
    
    @staticmethod
    def to_login_response(user: User, access_token: str) -> LoginResponseDTO:
        """Map authenticated user and token to HTTP response DTO."""
        return LoginResponseDTO(
            access_token=access_token,
            token_type="bearer"
        )
    
    @staticmethod
    def to_user_response(user: User) -> UserResponseDTO:
        """Map domain entity to HTTP response DTO."""
        return UserResponseDTO(
            email=user.email,
            full_name=user.full_name,
            disabled=user.disabled
        )

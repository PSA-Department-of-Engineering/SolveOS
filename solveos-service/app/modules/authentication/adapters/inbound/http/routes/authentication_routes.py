"""
Authentication HTTP routes.
"""

from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.modules.authentication.application.ports.inbound import Authentication
from app.modules.authentication.domain.exceptions import *
from app.modules.authentication.adapters.inbound.http.dtos import *
from app.modules.authentication.adapters.inbound.http.mappers import *
from app.modules.authentication.adapters.inbound.http.exception_handlers import *
from app.modules.authentication.adapters.inbound.http.utils import *
from app.modules.authentication.adapters.inbound.http.providers import *

router = APIRouter(tags=["Authentication"])

@router.post(
    "/login",
    response_model=LoginResponseDTO,
    summary="Login to get access token",
    description="OAuth2 compatible token login with HttpOnly cookie.",
    responses={
        200: {"description": "Successful authentication - cookie set"},
        401: {"description": "Invalid credentials"},
        400: {"description": "User account is disabled"}
    }
)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    authentication: Authentication = Depends(get_authentication_port),
    cookie_manager = Depends(get_cookie_manager),
    token_generator = Depends(get_token_generator),
) -> LoginResponseDTO:
    """
    Authenticate user and return access token.
    Sets HttpOnly cookie for secure token storage.
    """
    try:
        user = authentication.login(
            email=form_data.username,
            password=form_data.password
        )
        access_token = token_generator.generate(user.email)
        cookie_manager.set_auth_cookie(response, access_token)
        return AuthenticationMapper.to_login_response(user, access_token)
        
    except AuthenticationError as e:
        raise handle_authentication_exceptions(e)

@router.get(
    "/me",
    response_model=UserResponseDTO,
    summary="Get current user information",
    description="Retrieve information about the currently authenticated user.",
    responses={
        200: {"description": "Current user information"},
        401: {"description": "Not authenticated or invalid token"},
    }
)
async def get_current_user(
    token: str = Depends(get_current_user_token),
    authentication: Authentication = Depends(get_authentication_port),
) -> UserResponseDTO:
    """
    Get current authenticated user details.
    Requires valid authentication token in cookie.
    """
    try:
        user = authentication.get_current_user(token)
        return AuthenticationMapper.to_user_response(user)
        
    except AuthenticationError as e:
        raise handle_authentication_exceptions(e)

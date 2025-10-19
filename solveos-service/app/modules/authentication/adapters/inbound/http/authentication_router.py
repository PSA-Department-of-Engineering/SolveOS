from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app.modules.authentication.application.commands.login_user import (
    LoginUserHandler,
    LoginCommand,
)
from app.modules.authentication.application.queries.get_current_user import (
    GetCurrentUserHandler,
    GetCurrentUserQuery,
)
from app.modules.authentication.adapters.inbound.http.schemas import (
    TokenResponse,
    UserResponse,
)
from app.modules.authentication.adapters.inbound.dependencies import (
    get_login_handler,
    get_current_user_handler,
    get_current_user_token,
)
from app.shared.infrastructure.config import get_settings

router = APIRouter(tags=["Authentication"])


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login to get access token",
    description="""
    OAuth2 compatible token login with HttpOnly cookie.
    
    Authenticates the user and sets an HttpOnly cookie named `solveos_token`.
    The cookie is automatically included in subsequent requests to the same hostname.
    
    **Default test users:**
    - Email: admin@solveos.com, Password: secret
    - Email: user@solveos.com, Password: secret
    """,
    responses={
        200: {
            "description": "Successful authentication - cookie set",
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "token_type": "bearer"
                    }
                }
            }
        },
        401: {"description": "Invalid credentials"},
        400: {"description": "User account is disabled"}
    }
)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    handler: LoginUserHandler = Depends(get_login_handler)
) -> TokenResponse:
    """
    OAuth2 password flow login endpoint with HttpOnly cookie.
    Sets a secure, HttpOnly cookie named 'solveos_token' on successful authentication.
    """
    settings = get_settings()
    
    try:
        command = LoginCommand(
            email=form_data.username,  # OAuth2 uses 'username' field for email
            password=form_data.password
        )
        result = handler.handle(command)
        
        # Set HttpOnly cookie for stateless JWT authentication
        response.set_cookie(
            key="solveos_token",
            value=result.access_token,
            httponly=True,
            secure=not settings.DEBUG,  # True in production (HTTPS), False in dev
            samesite="lax",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            path="/",
        )
        
        return TokenResponse(
            access_token=result.access_token,
            token_type=result.token_type
        )
    except ValueError as e:
        if "disabled" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User account is disabled"
            )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user information",
    description="""
    Get information about the currently authenticated user.
    
    Requires a valid JWT token in the solveos_token cookie (automatically sent by browser).
    """,
    responses={
        200: {
            "description": "Current user information",
            "content": {
                "application/json": {
                    "example": {
                        "email": "admin@solveos.com",
                        "full_name": "Admin User",
                        "disabled": False
                    }
                }
            }
        },
        401: {"description": "Not authenticated or invalid token"},
    }
)
async def get_current_user(
    token: str = Depends(get_current_user_token),
    handler: GetCurrentUserHandler = Depends(get_current_user_handler)
) -> UserResponse:
    """
    Get current authenticated user.
    Protected endpoint - requires valid JWT token in cookie.
    """
    try:
        query = GetCurrentUserQuery(token=token)
        user = handler.handle(query)
        
        return UserResponse(
            email=user.email,
            full_name=user.full_name,
            disabled=user.disabled
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post(
    "/logout",
    summary="Logout and clear authentication cookie",
    description="""
    Logout the current user by clearing the authentication cookie.
    
    This endpoint clears the `solveos_token` cookie by setting it with an expired date.
    """,
    responses={
        200: {
            "description": "Successfully logged out",
            "content": {
                "application/json": {
                    "example": {"detail": "Successfully logged out"}
                }
            }
        }
    }
)
async def logout(response: Response) -> dict[str, str]:
    """
    Logout endpoint that clears the authentication cookie.
    """
    response.set_cookie(
        key="solveos_token",
        value="",
        httponly=True,
        secure=not get_settings().DEBUG,
        samesite="lax",
        max_age=0,  # Expire immediately
        path="/",
    )
    return {"detail": "Successfully logged out"}

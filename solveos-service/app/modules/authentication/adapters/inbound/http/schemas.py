from pydantic import BaseModel, EmailStr, Field


class TokenResponse(BaseModel):
    """
    OAuth2 token response schema.
    OpenAPI will generate this in the spec.
    """
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type (always 'bearer')")
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer"
            }
        }
    }


class UserResponse(BaseModel):
    """
    User information response schema.
    """
    email: EmailStr = Field(..., description="User email address")
    full_name: str | None = Field(None, description="User full name")
    disabled: bool = Field(default=False, description="Whether user is disabled")
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "admin@solveos.com",
                "full_name": "Admin User",
                "disabled": False
            }
        }
    }

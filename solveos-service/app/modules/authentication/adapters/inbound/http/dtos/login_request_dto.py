"""Login request DTO for HTTP adapter."""

from pydantic import BaseModel, EmailStr, Field

class LoginRequestDTO(BaseModel):
    """HTTP DTO for login request."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=1, description="User password")
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "admin@solveos.com",
                "password": "secret"
            }
        }
    }

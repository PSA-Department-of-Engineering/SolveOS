"""User response DTO for HTTP adapter."""

from pydantic import BaseModel, EmailStr, Field

class UserResponseDTO(BaseModel):
    """HTTP DTO for user information response."""
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

"""JWT token service."""

from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError


class TokenService:
    """Handles JWT token generation and verification."""
    
    def __init__(self, secret_key: str, algorithm: str = "HS256"):
        self._secret_key = secret_key
        self._algorithm = algorithm
    
    def generate(self, subject: str, expires_minutes: int = 30) -> str:
        """Generate a JWT token."""
        expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
        to_encode = {"sub": subject, "exp": expire}
        return jwt.encode(to_encode, self._secret_key, algorithm=self._algorithm)
    
    def verify(self, token: str) -> dict[str, str]:
        """Verify and decode a JWT token."""
        try:
            return jwt.decode(token, self._secret_key, algorithms=[self._algorithm])
        except JWTError as e:
            raise ValueError(f"Invalid token: {str(e)}")

from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

from app.modules.authentication.domain.ports.token_generator import TokenGenerator


class JWTTokenGenerator(TokenGenerator):
    """
    JWT implementation of TokenGenerator port.
    Outbound adapter using python-jose.
    """
    
    def __init__(self, secret_key: str, algorithm: str = "HS256"):
        self._secret_key = secret_key
        self._algorithm = algorithm
    
    def create_access_token(self, subject: str, expires_delta: timedelta | None = None) -> str:
        """Create a JWT access token"""
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        
        to_encode = {
            "sub": subject,
            "exp": expire
        }
        
        encoded_jwt = jwt.encode(to_encode, self._secret_key, algorithm=self._algorithm)
        return encoded_jwt
    
    def decode_token(self, token: str) -> dict[str, str]:
        """Decode and validate JWT token"""
        try:
            payload = jwt.decode(token, self._secret_key, algorithms=[self._algorithm])
            return payload
        except JWTError as e:
            raise ValueError(f"Invalid token: {str(e)}")

"""Password hashing service."""

import bcrypt


class PasswordService:
    """Handles password hashing and verification using bcrypt."""
    
    def __init__(self):
        pass
    
    def hash(self, plain_password: str) -> str:
        """Hash a plain text password."""
        # Convert string to bytes and hash
        password_bytes = plain_password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password_bytes, salt)
        # Return as string for storage
        return hashed.decode('utf-8')
    
    def verify(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against a hash."""
        try:
            # Convert both to bytes
            password_bytes = plain_password.encode('utf-8')
            hashed_bytes = hashed_password.encode('utf-8')
            # Verify
            return bcrypt.checkpw(password_bytes, hashed_bytes)
        except Exception:
            return False

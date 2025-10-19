"""Domain-specific exceptions for authentication."""

class AuthenticationError(Exception):
    """Base exception for authentication domain errors."""
    pass

class InvalidCredentialsError(AuthenticationError):
    """Raised when user credentials are invalid."""
    def __init__(self, message: str = "Invalid email or password"):
        self.message = message
        super().__init__(self.message)


class UserDisabledError(AuthenticationError):
    """Raised when user account is disabled."""
    def __init__(self, message: str = "User account is disabled"):
        self.message = message
        super().__init__(self.message)


class InvalidTokenError(AuthenticationError):
    """Raised when JWT token is invalid or expired."""
    def __init__(self, message: str = "Invalid or expired token"):
        self.message = message
        super().__init__(self.message)


class UserNotFoundError(AuthenticationError):
    """Raised when user is not found."""
    def __init__(self, message: str = "User not found"):
        self.message = message
        super().__init__(self.message)

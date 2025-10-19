"""
Dependency providers for authentication HTTP adapter.

These are provider stubs specific to this adapter that will be overridden 
at the composition root with actual implementations.
"""

from app.modules.authentication.application.ports.inbound import Authentication

def get_authentication_port() -> Authentication:
    """Dependency provider for Authentication port."""
    raise NotImplementedError(
        "Authentication port not configured. "
        "Override this dependency in the composition root."
    )

def get_token_generator():
    """Dependency provider for token generation service."""
    raise NotImplementedError(
        "Token generator not configured. "
        "Override this dependency in the composition root."
    )

def get_cookie_manager():
    """Dependency provider for cookie management service."""
    raise NotImplementedError(
        "Cookie manager not configured. "
        "Override this dependency in the composition root."
    )

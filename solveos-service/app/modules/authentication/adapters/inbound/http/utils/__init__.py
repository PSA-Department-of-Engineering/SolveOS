"""
Utilities for HTTP authentication adapter.
"""

from .token_extractor import get_current_user_token
from .cookie_manager import CookieManager

__all__ = [
    "get_current_user_token",
    "CookieManager",
]

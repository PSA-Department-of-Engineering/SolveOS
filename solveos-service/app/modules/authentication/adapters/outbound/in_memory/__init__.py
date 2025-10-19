"""In-memory persistence implementation for authentication module.

This package contains the complete in-memory persistence strategy.
Each storage component is separated into its own file following SOLID principles.
"""

from .persistence_adapter import InMemoryPersistenceAdapter

__all__ = ["InMemoryPersistenceAdapter"]

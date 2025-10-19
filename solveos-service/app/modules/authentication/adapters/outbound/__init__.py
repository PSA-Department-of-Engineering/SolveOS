"""Outbound adapters for authentication module.

Each subdirectory represents ONE complete persistence implementation strategy:
- in_memory/: In-memory implementation (dev/testing)
- postgresql/: PostgreSQL implementation (future)
- cassandra/: Cassandra implementation (future)

Each adapter directory contains:
- persistence_adapter.py: Main adapter orchestrator
- *_storage.py: Entity-specific storage components
"""

from .in_memory import InMemoryPersistenceAdapter

__all__ = ["InMemoryPersistenceAdapter"]

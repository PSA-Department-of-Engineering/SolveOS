# SolveOS Service - Backend API

FastAPI backend service serving all SolveOS functional domains.

## Architecture

Clean Architecture / Hexagonal (Ports & Adapters)

```
┌──────────────────────────────────────────────────────────┐
│             Inbound Adapters (HTTP Layer)                │
│      FastAPI Routes, DTOs, Mappers, Exception Handlers   │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│          Application Layer (Use Cases & Ports)           │
│        Use Cases + Port Interfaces (Inbound/Outbound)    │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│               Domain Layer (Business Logic)              │
│            Entities, Value Objects, Exceptions           │
└────────────────────▲─────────────────────────────────────┘
                     │
┌────────────────────┴─────────────────────────────────────┐
│        Outbound Adapters (Port Implementations)          │
│          Persistence, External Services, etc.            │
└──────────────────────────────────────────────────────────┘
```

**Dependency Rule**: All dependencies point inward. Domain has NO external dependencies.

## Project Structure

Each business module is self-contained following Clean Architecture:

```
modules/
├── module_name/                        # Bounded context (e.g., authentication)
│   ├── di.py                           # Dependency injection configuration
│   │
│   ├── domain/                         # Core business logic (pure Python)
│   │   ├── entities/                   # Business objects (e.g., User)
│   │   └── exceptions/                 # Domain-specific exceptions
│   │
│   ├── application/                    # Use cases & port interfaces
│   │   ├── ports/                      # Interfaces (contracts)
│   │   │   ├── inbound/                # Use case interfaces
│   │   │   └── outbound/               # Repository/service interfaces
│   │   └── use_cases/                  # Business logic orchestration
│   │
│   └── adapters/                       # External implementations
│       ├── inbound/                    # Driving adapters (API)
│       │   └── http/         
│       │       ├── routes/             # FastAPI routers
│       │       ├── dtos/               # Request/Response models (Pydantic)
│       │       ├── mappers/            # Domain ↔DTO transformations
│       │       ├── utils/              # HTTP utilities (cookies, tokens)
│       │       └── exception_handlers/ # HTTP exception mappings
│       │
│       └── outbound/                   # Driven adapters (persistence, etc.)
│           └── in_memory/              # In-memory implementation
```

## Quick Start

### Prerequisites
- Python 3.11+
- pip

### Installation

```powershell
py -m pip install "fastapi[standard]" "python-jose[cryptography]" "passlib[bcrypt]" pydantic-settings
py -m fastapi dev app/main.py
```

The API will be available at:
- **API**: http://127.0.0.1:8000
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc
- **OpenAPI JSON**: http://127.0.0.1:8000/openapi.json

### Configuration

Create `.env` file (copy from `.env.example`).

## Authentication

Authentication uses `python-jose` with JWT tokens implementing OAuth2 password flow via HttpOnly cookies.

- Cookie name: `solveos_token`
- Token type: JWT (stateless)
- Security: HttpOnly, Secure in production, SameSite=Lax
- Expiry: 30 minutes (configurable via `ACCESS_TOKEN_EXPIRE_MINUTES`)

### Default Test Users

```
👤 Admin User
Email: admin@solveos.com
Password: admin

👤 Example User
Email: user@solveos.com  
Password: admin
```

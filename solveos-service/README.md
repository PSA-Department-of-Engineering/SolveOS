# SolveOS Service - Backend API

FastAPI backend service serving all SolveOS functional domains.

## Architecture

Clean Architecture / Hexagonal (Ports & Adapters)

```
┌──────────────────────────────────────────────────────────┐
│             Presentation (Inbound Adapters)              │
│            FastAPI Routes, Pydantic Schemas              │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│             Application Layer (Use Cases)                │
│           Commands & Queries (CQRS Pattern)              │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│            Domain Layer (Business Logic)                 │
│       Entities, Value Objects, Ports (Interfaces)        │
└────────────────────▲─────────────────────────────────────┘
                     │
┌────────────────────┴─────────────────────────────────────┐
│            Infrastructure (Outbound Adapters)            │
│     Implementations: Database, Security, Notifications   │
└──────────────────────────────────────────────────────────┘
```

**Dependency Rule**: All dependencies point inward. Domain has NO external dependencies.

## Project Structure

Each business module is self-contained following Clean Architecture:

```
modules/
├── module_name/                        # Bounded context
│   ├── domain/                         # Core business logic
│   │   ├── entities/                   # Business objects (e.g. User, Order)
│   │   ├── ports/                      # Interfaces (contracts)
│   │   └── exceptions/                 # Domain-specific exceptions
│   
│   ├── application/                    # Use cases w/CQRS
│   │   ├── commands/                   # Write operations
│   │   ├── queries/                    # Read operations
│   │   └── dtos/                       # Application data transfer objects
│   
│   └── adapters/                       # External implementations
│       ├── inbound/                    # Driving adapters (API)
│       │   └── http/         
│       │       ├── routes/             # Thin HTTP routers
│       │       ├── requests/           # HTTP request models
│       │       ├── responses/          # HTTP response models
│       │       ├── mappers/            # Layer transformations
│       │       └── exception_handlers/
│       └── outbound/                   # Driven adapters (DB, security, etc.)
│           ├── repositories/           # Storage implementation
│           └── security/               # Security implementation
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

Create `.env` file (copy from `.env.example`):

```env
APP_NAME=SolveOS API
APP_VERSION=1.0.0
DEBUG=True

SECRET_KEY=your-super-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

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
Password: secret

👤 Regular User
Email: user@solveos.com  
Password: secret
```

# SolveOS Service - Backend API

FastAPI backend service implementing **Clean Architecture** (Hexagonal Pattern) with a **Modular Monolith** approach.

## 🏗️ Architecture

### Clean Architecture / Hexagonal (Ports & Adapters)

```
┌──────────────────────────────────────────────────────────┐
│         🌐 Presentation (Inbound Adapters)              │
│           FastAPI Routes, Pydantic Schemas              │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│         📋 Application Layer (Use Cases)                │
│        Commands & Queries (CQRS Pattern)                │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│         🎯 Domain Layer (Business Logic)                │
│     Entities, Value Objects, Ports (Interfaces)         │
│           ⚠️  ZERO External Dependencies                 │
└──────────────────────────────────────────────────────────┘
                     ▲
                     │
┌────────────────────┴─────────────────────────────────────┐
│         🔌 Infrastructure (Outbound Adapters)           │
│    Implementations: Database, Security, Notifications   │
└──────────────────────────────────────────────────────────┘
```

**Dependency Rule**: All dependencies point inward. Domain has NO external dependencies.

## 📦 Module Structure

Each business module is self-contained following Clean Architecture:

```
modules/authentication/
├── domain/                          # 🎯 Core business logic
│   ├── entities/                    # Business objects (User)
│   └── ports/                       # Interfaces (contracts)
│       ├── user_repository.py       # Data access contract
│       ├── password_hasher.py       # Password hashing contract
│       └── token_generator.py       # Token generation contract
│
├── application/                     # 📋 Use cases
│   ├── commands/                    # Write operations
│   │   └── login_user.py           # Login command handler
│   └── queries/                     # Read operations
│       └── get_current_user.py     # Get user query handler
│
└── adapters/                        # 🔌 External implementations
    ├── inbound/                     # Driving (API)
    │   └── http/
    │       ├── authentication_router.py  # FastAPI endpoints
    │       ├── schemas.py           # Pydantic request/response models
    │       └── dependencies.py      # FastAPI DI
    └── outbound/                    # Driven (implementations)
        ├── repositories/
        │   └── in_memory_user_repository.py  # User storage impl
        └── security/
            ├── bcrypt_password_hasher.py     # Bcrypt impl
            └── jwt_token_generator.py        # JWT impl
```

## ✨ Features

- ✅ **Clean Architecture** - Hexagonal pattern, testable, maintainable
- ✅ **OAuth2 + JWT** - Industry-standard authentication
- ✅ **Auto-generated Swagger** - OpenAPI 3.1 spec at `/openapi.json`
- ✅ **Interactive Docs** - Swagger UI at `/docs` with OAuth2 support
- ✅ **Type-Safe** - Full Python type hints + Pydantic validation
- ✅ **SOLID Principles** - Dependency inversion, single responsibility
- ✅ **CQRS Pattern** - Separate commands (writes) from queries (reads)
- ✅ **Modular Monolith** - Independent modules, easy to extract to microservices

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- pip

### Installation

```powershell
cd solveos-service

# Install dependencies
py -m pip install "fastapi[standard]" "python-jose[cryptography]" "passlib[bcrypt]" pydantic-settings
```

### Run Development Server

```powershell
py -m fastapi dev app/main.py
```

The API will be available at:
- 🌐 **API**: http://127.0.0.1:8000
- 📚 **Swagger UI**: http://127.0.0.1:8000/docs
- 📖 **ReDoc**: http://127.0.0.1:8000/redoc
- 🔧 **OpenAPI JSON**: http://127.0.0.1:8000/openapi.json

## 🔐 Authentication

### Default Test Users

```
👤 Admin User
Email: admin@solveos.com
Password: secret

👤 Regular User
Email: user@solveos.com  
Password: secret
```

### OAuth2 Flow

1. **Login** - POST `/api/v1/auth/login`:
   ```bash
   curl -X POST "http://127.0.0.1:8000/api/v1/auth/login" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=admin@solveos.com&password=secret"
   ```

2. **Response**:
   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "token_type": "bearer"
   }
   ```

3. **Use Token** - Include in Authorization header:
   ```bash
   curl -X GET "http://127.0.0.1:8000/api/v1/auth/me" \
     -H "Authorization: Bearer <your_token>"
   ```

### Using Swagger UI

1. Go to http://127.0.0.1:8000/docs
2. Click **Authorize** button (🔓)
3. Enter:
   - **username**: `admin@solveos.com`
   - **password**: `secret`
4. Click **Authorize**
5. Test endpoints (they'll have 🔒 if auth required)

## 📘 OpenAPI & Frontend Integration

### Generate TypeScript Types

The API automatically generates OpenAPI 3.1 specification. Use it to generate TypeScript types:

```bash
# Install openapi-typescript
npm install -D openapi-typescript

# Generate types from running API
npx openapi-typescript http://localhost:8000/openapi.json -o src/api/generated.ts
```

Example usage:
```typescript
import type { paths } from './api/generated';

type TokenResponse = paths['/api/v1/auth/login']['post']['responses']['200']['content']['application/json'];
type UserResponse = paths['/api/v1/auth/me']['get']['responses']['200']['content']['application/json'];

// Fully type-safe API client
const login = async (email: string, password: string): Promise<TokenResponse> => {
  const formData = new URLSearchParams({ username: email, password });
  const response = await fetch('http://localhost:8000/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData
  });
  return response.json();
};
```

## ⚙️ Configuration

Create `.env` file (copy from `.env.example`):

```env
# Application
APP_NAME=SolveOS API
APP_VERSION=1.0.0
DEBUG=True

# Security - ⚠️ CHANGE IN PRODUCTION!
SECRET_KEY=your-super-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

## 📂 Full Project Structure

```
solveos-service/
├── app/
│   ├── main.py                     # FastAPI application factory
│   ├── modules/                    # Business modules (bounded contexts)
│   │   └── authentication/         # Authentication module
│   │       ├── domain/            # Business logic (zero dependencies)
│   │       ├── application/       # Use cases (commands/queries)
│   │       └── adapters/          # External implementations
│   │           ├── inbound/       # API layer (FastAPI)
│   │           └── outbound/      # Implementations (DB, security)
│   ├── shared/                    # Shared kernel
│   │   └── infrastructure/
│   │       └── config.py         # Settings
│   └── api/
│       ├── router.py             # Main API router
│       └── health.py             # Health check
├── .env                           # Environment variables (not in git)
├── .env.example                   # Template
├── .gitignore
├── requirements.txt
└── README.md
```

## 🎯 Design Principles

### SOLID
- ✅ **Single Responsibility** - One class per file
- ✅ **Open/Closed** - Extend via ports/adapters
- ✅ **Liskov Substitution** - Interfaces define contracts
- ✅ **Interface Segregation** - Focused port interfaces
- ✅ **Dependency Inversion** - Depend on abstractions (ports)

### Clean Architecture
- ✅ Domain layer has **zero** external dependencies
- ✅ Application layer depends **only** on domain
- ✅ Infrastructure **implements** domain ports
- ✅ Presentation depends on application

### Self-Documenting
- ✅ File structure tells the story
- ✅ Type hints everywhere
- ✅ Pydantic auto-generates OpenAPI
- ✅ Swagger UI for exploration

## 🔒 Security Notes

⚠️ **Before Production**:
1. ✅ Change `SECRET_KEY` (use `openssl rand -hex 32`)
2. ✅ Mount user database from secrets manager
3. ✅ Use environment variables for all secrets
4. ✅ Enable HTTPS/TLS
5. ✅ Add rate limiting
6. ✅ Implement input sanitization
7. ✅ Add logging & monitoring
8. ✅ Set up SIEM/security alerts

## 🧪 Testing

```powershell
# Unit tests (test domain & application layers)
pytest tests/unit

# Integration tests (test adapters)
pytest tests/integration

# E2E tests (test full API)
pytest tests/e2e
```

## 📚 Next Steps

- [ ] Add Orders module
- [ ] Add Customers module  
- [ ] Add Services module
- [ ] Add Reporting module
- [ ] PostgreSQL integration
- [ ] User registration
- [ ] Refresh tokens
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting
- [ ] Structured logging
- [ ] Health checks & metrics
- [ ] Unit + integration tests

## 📖 Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [OpenAPI Specification](https://swagger.io/specification/)

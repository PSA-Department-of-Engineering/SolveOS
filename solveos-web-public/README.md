# SolveOS Web Public

Public-facing login portal for SolveOS built with React, TypeScript, and Vite.

## Overview

This is the authentication entry point for SolveOS. After successful login, users are redirected to the main authenticated application (running on a different port).

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **FastAPI** - Backend authentication (OAuth2)

## Project Structure

```
src/
├── api/                    # API client layer
│   ├── interfaces.ts       # API contracts
│   ├── index.ts           # Main exports
│   ├── clients/           # API client implementations
│   │   └── AuthenticationClient.ts
│   ├── models/            # DTOs (one per file)
│   │   ├── LoginRequestDTO.ts
│   │   ├── LoginResponseDTO.ts
│   │   └── UserDTO.ts
│   └── docs/              # API documentation (Swagger)
│       └── swagger.md
├── components/            # React components
│   ├── login/            # Login-specific components
│   └── shared/           # Shared/reusable components
├── hooks/                # Custom React hooks
│   ├── useLoginFormValidation.ts
│   └── useLoginSubmission.ts
├── layouts/              # Page layouts
├── pages/                # Page components
├── theme/                # MUI theme configuration
├── utils/                # Utility functions
│   ├── tokenStorage.ts   # Token management
│   └── validation/       # Validation utilities
└── config/               # Application configuration
    └── appConfig.ts      # Environment-based config
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# FastAPI Backend URL
VITE_API_BASE_URL=http://localhost:8000

# Authentication Endpoint
VITE_AUTH_TOKEN_ENDPOINT=/api/auth/token

# Post-Login Redirect (authenticated app on different port)
VITE_REDIRECT_AFTER_LOGIN=http://localhost:3000
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- FastAPI backend running (see backend setup)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Application runs on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Authentication Flow

1. User enters email and password on login page
2. Frontend sends request to FastAPI backend (`/api/auth/token`)
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. User is redirected to authenticated app (different port)

## API Integration

### FastAPI Backend

The authentication client is compatible with FastAPI's OAuth2 password flow:

```python
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

app = FastAPI()

@app.post("/api/auth/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Validate credentials
    # Return: {"access_token": "...", "token_type": "bearer"}
    pass
```

### Client Usage

```typescript
import { AuthenticationClient } from './api';
import { tokenStorage } from './utils/tokenStorage';
import { config } from './config/appConfig';

const authClient = new AuthenticationClient(
    config.apiBaseUrl,
    config.authTokenEndpoint
);

// Login
const response = await authClient.login(email, password);
tokenStorage.setAccessToken(response.access_token);

// Redirect to authenticated app
window.location.href = config.redirectAfterLogin;
```

## Design Principles

### SOLID Principles

- **Single Responsibility**: Each class/component has one clear purpose
- **Open/Closed**: Easy to extend without modifying existing code
- **Liskov Substitution**: Implementations adhere to interface contracts
- **Interface Segregation**: Clean, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### Code Organization

- **One object per file**: Easy to locate and maintain
- **Self-describing structure**: Directory names indicate contents
- **Interfaces in interfaces.ts**: Central contract definitions
- **DTOs in models/**: One data structure per file
- **Implementations in clients/**: One implementation per file
- **Utilities in utils/**: Shared helper functions

## Key Features

- ✅ FastAPI OAuth2 password flow compatible
- ✅ Material-UI design system
- ✅ Type-safe with TypeScript
- ✅ Form validation
- ✅ Token storage management
- ✅ Configurable post-login redirect
- ✅ Production-ready build

## Development

### Code Style

```bash
npm run lint
```

### Type Checking

TypeScript is configured for strict type checking. Run:

```bash
npx tsc --noEmit
```

## Security Considerations

- Tokens stored in localStorage (consider httpOnly cookies for production)
- Always use HTTPS in production
- Configure CORS properly on backend
- Implement token refresh for long sessions
- Add rate limiting to login endpoint

## License

See main SolveOS repository for license information.

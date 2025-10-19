# SolveOS Web Public

Public-facing login portal for SolveOS.

This is the authentication entry point for SolveOS. After successful login, users are redirected to the main authenticated application.

## Project Structure

```
src/
├── api/                    # API client layer
│   ├── interfaces.ts       # API contracts
│   ├── index.ts            # API exports
│   ├── clients/            # API client implementations
│   ├── models/             # DTOs
│   └── docs/               # API documentation
├── components/             # React components
│   ├── login/              # Login-specific components
│   └── shared/             # Shared/reusable components
├── hooks/                  # Custom React hooks
├── layouts/                # Page layouts
├── pages/                  # Pages
├── theme/                  # MUI theme configuration
├── utils/                  # Utility functions
└── config/                 # Application configuration
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_AUTH_TOKEN_ENDPOINT=/api/auth/token
VITE_REDIRECT_AFTER_LOGIN=http://localhost:3000
```

## Getting Started

### Prerequisites

- Node.js 25+ 
- npm

### Installation Commands

```bash
npm install && npm run dev
```

Application runs on `http://localhost:5173`

### Build

```bash
npm run build
```

## User Journey

1. User enters email and password on login page
2. Frontend sends request to FastAPI backend (`/api/auth/token`)
3. Backend validates credentials and returns JWT token
4. Frontend stores token in localStorage
5. User is redirected to authenticated app

### Technical Considerations

- Auth transport is via cookie (`solveos_token`).

- After login, redirect the browser to `VITE_REDIRECT_AFTER_LOGIN`.

- Please be aware this cookie will only work within the same hostname.

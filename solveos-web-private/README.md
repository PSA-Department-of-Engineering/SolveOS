# SolveOS Web Private

Private authenticated interface for SolveOS order management platform.

## Features

- **Dashboard**: Overview of key business metrics and statistics
- **Order Management**: Create, track, and manage orders with real-time status updates
- **Customer Management**: Maintain customer records and view order history
- **Reporting**: View metrics, analytics, and business insights
- **Settings**: Configure services, modifiers, and system preferences

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file based on `.env.example`:

## Project Structure

```
solveos-web-private/
├── public/
│   └── (static assets)
├── src/
    ├── api/                         # API Layer - Handles all backend communication
    │   ├── apiClient.ts             # Base HTTP client with authentication
    │   ├── interfaces.ts            # Shared TypeScript type definitions
    │   └── clients/                 # Domain-specific API clients
    ├── components/                  # Reusable UI Components
    ├── config/                      # Configuration Layer   │
    ├── layouts/                     # Main authenticated app layout
    ├── pages/                       # Page Components (one per route)│   │
    ├── routes/                      # Routing Configuration
    ├── theme/                       # UI Theme Configuration
    ├── utils/                       # Utility Functions
    ├── App.css                      # Global application styles
    ├── App.tsx                      # Root application component
    ├── index.css                    # Base CSS reset and globals
    └── main.tsx                     # Application entry point
```

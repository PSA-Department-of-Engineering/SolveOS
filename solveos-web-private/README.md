# SolveOS Web Private# SolveOS Web Private



Private authenticated interface for SolveOS business management platform.



## FeaturesPrivate authenticated interface for SolveOS business management platform.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



- **Dashboard**: Overview of key business metrics and statistics

- **Order Management**: Create, track, and manage orders with real-time status updates

- **Customer Management**: Maintain customer records and view order history## FeaturesCurrently, two official plugins are available:

- **Reporting**: View metrics, analytics, and business insights

- **Settings**: Configure services, modifiers, and system preferences



## Tech Stack- **Dashboard**: Overview of key business metrics and statistics- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh



- React 19 with TypeScript- **Order Management**: Create, track, and manage orders with real-time status updates- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- Material UI (MUI) for components

- React Router for navigation- **Customer Management**: Maintain customer records and view order history

- Vite for build tooling

- ESLint & Prettier for code quality- **Reporting**: View metrics, analytics, and business insights## React Compiler



## Getting Started- **Settings**: Configure services, modifiers, and system preferences



```bashThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

# Install dependencies

npm install## Tech Stack



# Create environment file## Expanding the ESLint configuration

cp .env.example .env

- React 19 with TypeScript

# Start development server (runs on port 3000)

npm run dev- Material UI (MUI) for componentsIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:



# Build for production- React Router for navigation

npm run build

- Vite for build tooling```js

# Preview production build

npm run preview- ESLint & Prettier for code qualityexport default defineConfig([



# Lint code  globalIgnores(['dist']),

npm run lint

```## Getting Started  {



## Environment Variables    files: ['**/*.{ts,tsx}'],



Create a `.env` file based on `.env.example`:```bash    extends: [



```# Install dependencies      // Other configs...

VITE_API_BASE_URL=http://localhost:8000

VITE_AUTH_TOKEN_KEY=solveos_auth_tokennpm install

VITE_LOGIN_PAGE_URL=http://localhost:5173

```      // Remove tseslint.configs.recommended and replace with this



## Project Structure# Create environment file      tseslint.configs.recommendedTypeChecked,



```cp .env.example .env      // Alternatively, use this for stricter rules

solveos-web-private/

├── public/      tseslint.configs.strictTypeChecked,

│   └── (static assets)

├── src/# Start development server (runs on port 3000)      // Optionally, add this for stylistic rules

│   ├── api/                          # API Layer - Handles all backend communication

│   │   ├── apiClient.ts             # Base HTTP client with authenticationnpm run dev      tseslint.configs.stylisticTypeChecked,

│   │   ├── interfaces.ts            # Shared TypeScript type definitions

│   │   └── clients/                 # Domain-specific API clients

│   │       ├── CustomerClient.ts    # Customer CRUD operations

│   │       ├── OrderClient.ts       # Order management operations# Build for production      // Other configs...

│   │       ├── ReportsClient.ts     # Analytics and reporting

│   │       └── ServiceClient.ts     # Service configurationnpm run build    ],

│   │

│   ├── components/                   # Reusable UI Components    languageOptions: {

│   │   └── navigation/              # Application navigation

│   │       ├── MainLayoutAppBar.tsx # Top app bar with logout# Preview production build      parserOptions: {

│   │       └── MainLayoutNavigation.tsx # Side drawer navigation menu

│   │npm run preview        project: ['./tsconfig.node.json', './tsconfig.app.json'],

│   ├── config/                      # Configuration Layer

│   │   └── appConfig.ts            # Environment-based application config        tsconfigRootDir: import.meta.dirname,

│   │

│   ├── hooks/                       # Custom React Hooks (future expansion)# Lint code      },

│   │

│   ├── layouts/                     # Layout Componentsnpm run lint      // other options...

│   │   ├── MainLayout.tsx          # Main authenticated app layout

│   │   ├── MainLayoutProps.ts      # Layout component props interface```    },

│   │   └── MainLayoutStyles.ts     # Layout styling definitions

│   │  },

│   ├── pages/                       # Page Components (one per route)

│   │   ├── DashboardPage.tsx       # Dashboard with metrics overview## Environment Variables])

│   │   ├── OrdersPage.tsx          # Order management interface

│   │   ├── CustomersPage.tsx       # Customer management interface```

│   │   ├── ReportsPage.tsx         # Reports and analytics

│   │   └── SettingsPage.tsx        # Application settingsCreate a `.env` file based on `.env.example`:

│   │

│   ├── routes/                      # Routing ConfigurationYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

│   │   └── AppRouter.tsx           # React Router setup and route definitions

│   │```

│   ├── theme/                       # UI Theme Configuration

│   │   └── ApplicationTheme.ts     # Material-UI theme customizationVITE_API_BASE_URL=http://localhost:8000```js

│   │

│   ├── utils/                       # Utility FunctionsVITE_AUTH_TOKEN_KEY=solveos_auth_token// eslint.config.js

│   │   ├── currencyFormatter.ts    # Currency formatting helper

│   │   ├── dateFormatter.ts        # Date/time formatting helpersVITE_LOGIN_PAGE_URL=http://localhost:5173import reactX from 'eslint-plugin-react-x'

│   │   └── tokenStorage.ts         # Authentication token management

│   │```import reactDom from 'eslint-plugin-react-dom'

│   ├── App.css                      # Global application styles

│   ├── App.tsx                      # Root application component

│   ├── index.css                    # Base CSS reset and globals

│   └── main.tsx                     # Application entry point## Project Structureexport default defineConfig([

│

├── .env.example                     # Environment variable template  globalIgnores(['dist']),

├── .gitignore                       # Git ignore rules

├── eslint.config.js                 # ESLint configuration```  {

├── index.html                       # HTML template

├── package.json                     # NPM dependencies and scriptssrc/    files: ['**/*.{ts,tsx}'],

├── README.md                        # Project documentation

├── tsconfig.app.json               # TypeScript config for app code├── api/                    # API client modules    extends: [

├── tsconfig.json                    # TypeScript base config

├── tsconfig.node.json              # TypeScript config for Node code│   ├── apiClient.ts       # Base API client with auth      // Other configs...

└── vite.config.ts                  # Vite build tool configuration

```│   ├── interfaces.ts      # Shared TypeScript interfaces      // Enable lint rules for React



## File Naming Conventions│   └── clients/           # Domain-specific API clients      reactX.configs['recommended-typescript'],



### Components│       ├── CustomerClient.ts      // Enable lint rules for React DOM

- **PascalCase** for component files: `DashboardPage.tsx`, `MainLayout.tsx`

- **Props files**: ComponentName + `Props.ts` (e.g., `MainLayoutProps.ts`)│       ├── OrderClient.ts      reactDom.configs.recommended,

- **Styles files**: ComponentName + `Styles.ts` (e.g., `MainLayoutStyles.ts`)

│       ├── ReportsClient.ts    ],

### API Clients

- **PascalCase** with "Client" suffix: `OrderClient.ts`, `CustomerClient.ts`│       └── ServiceClient.ts    languageOptions: {



### Utilities├── components/            # Reusable UI components      parserOptions: {

- **camelCase** descriptive names: `tokenStorage.ts`, `dateFormatter.ts`

│   └── navigation/        # Navigation components        project: ['./tsconfig.node.json', './tsconfig.app.json'],

### Configuration

- **camelCase**: `appConfig.ts`│       ├── MainLayoutAppBar.tsx        tsconfigRootDir: import.meta.dirname,



## Architecture Principles│       └── MainLayoutNavigation.tsx      },



This project follows **SOLID**, **KISS**, and **self-descriptive structure** principles:├── config/               # Application configuration      // other options...



### Single Responsibility Principle (SRP)│   └── appConfig.ts      # Environment-based config    },

Each file has one clear purpose:

- API clients handle only API communication├── hooks/                # Custom React hooks (future)  },

- Components handle only UI rendering

- Utils handle only specific utility functions├── layouts/              # Page layout components])

- Configs handle only configuration

│   ├── MainLayout.tsx```

### Interface Segregation

Types and interfaces are separated into dedicated files:│   ├── MainLayoutProps.ts

- `interfaces.ts` for shared types│   └── MainLayoutStyles.ts

- `*Props.ts` for component props├── pages/                # Top-level page components

│   ├── CustomersPage.tsx

### Dependency Inversion│   ├── DashboardPage.tsx

Components depend on abstractions (interfaces) not concrete implementations:│   ├── OrdersPage.tsx

- API clients expose clean interfaces│   ├── ReportsPage.tsx

- Components receive props via interfaces│   └── SettingsPage.tsx

├── routes/               # Routing configuration

### Keep It Simple (KISS)│   └── AppRouter.tsx

- No complex abstractions until needed├── theme/                # MUI theme configuration

- Clear, readable code over clever code│   └── ApplicationTheme.ts

- Straightforward folder structure├── utils/                # Utility functions

│   ├── currencyFormatter.ts

### Self-Descriptive Structure│   ├── dateFormatter.ts

The tree structure tells the story:│   └── tokenStorage.ts

- `api/clients/` → "API client modules live here"├── App.tsx               # Root application component

- `pages/` → "Top-level page components"├── main.tsx              # Application entry point

- `components/navigation/` → "Navigation-related components"└── index.css             # Global styles

```

## Development Workflow

## Architecture Principles

1. **Add new pages**: Create in `src/pages/`, add route in `AppRouter.tsx`

2. **Add new API**: Create client in `src/api/clients/`, define types in `interfaces.ts`This project follows:

3. **Add new components**: Create in appropriate `src/components/` subdirectory

4. **Add new utilities**: Create in `src/utils/` with descriptive name- **SOLID principles**: Single responsibility, well-defined interfaces

- **KISS**: Keep it simple, avoid over-engineering

## Future Expansion Areas- **Self-descriptive structure**: Tree structure explains functionality

- **One object per file**: Clear module boundaries and easy navigation

- `src/hooks/` - Custom hooks for shared logic
- `src/components/orders/` - Order-specific components
- `src/components/customers/` - Customer-specific components
- `src/components/reports/` - Report-specific components
- `src/components/shared/` - Truly shared components
- `src/contexts/` - React Context providers (if needed)
- `src/services/` - Business logic layer (if needed)

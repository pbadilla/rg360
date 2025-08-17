# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

RollerGrind360 E-commerce Platform is a multi-app monorepo built for skating product e-commerce. The platform consists of three main applications:

- **API**: Node.js/Express REST API with MongoDB (Mongoose)
- **Frontend**: Next.js customer-facing e-commerce website  
- **Backoffice**: React/Vite admin dashboard for managing the platform

## Tech Stack

### API (`apps/api/`)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **Payments**: Redsys payment gateway integration
- **AI**: OpenAI integration for product descriptions
- **Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer
- **File Processing**: CSV parsing, FTP transfers

### Frontend (`apps/frontend/`)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Bootstrap + SASS
- **UI Components**: Custom modals, carousels, product galleries
- **Features**: Cart, wishlist, product comparison, search

### Backoffice (`apps/backoffice/`)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Radix UI + shadcn/ui components
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router
- **Forms**: React Hook Form with Zod validation

## Development Commands

### Root Level Commands
```bash
# Start all services concurrently
pnpm dev

# Start individual services
pnpm dev:api      # API on port 3000
pnpm dev:front    # Frontend on port 3001
pnpm dev:backoffice # Backoffice on port 8080

# Build all apps
pnpm build

# Python helper (starts all + opens browsers)
python3 openRepos.py
```

### Per-App Commands
```bash
# API
cd apps/api
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Run production build

# Frontend  
cd apps/frontend
pnpm dev          # Next.js dev server
pnpm build        # Build for production
pnpm start        # Start production server

# Backoffice
cd apps/backoffice
pnpm dev          # Vite dev server
pnpm build        # Build for production
pnpm lint         # ESLint
```

## Architecture Overview

### API Structure
- **Models**: MongoDB schemas for products, users, orders, payments, etc.
- **Controllers**: Business logic organized by feature (products, users, orders, etc.)
- **Routes**: Express route definitions with middleware
- **Middleware**: Authentication, CORS, logging
- **Config**: Database connection, environment variables, Swagger setup
- **External Integrations**: 
  - Product importers (Universkate, Rollerblade via CSV/FTP)
  - Redsys payment processing
  - OpenAI for AI-generated descriptions

### Key API Endpoints
- `/auth` - Authentication & JWT tokens
- `/products` - Product CRUD operations
- `/orders` - Order management
- `/payments` - Payment processing (Redsys)
- `/users` - User management
- `/stock` - Inventory management
- `/api-docs` - Swagger documentation

### Frontend Architecture  
- **App Router**: Next.js 15 with app directory structure
- **Components**: Reusable UI components (modals, forms, product displays)
- **Context**: Global state management for cart, user session
- **Services**: API communication layer
- **Public Assets**: Images, styles, static files

### Backoffice Architecture
- **Pages**: Admin interface screens (dashboard, products, orders, users)
- **Components**: shadcn/ui component library with custom implementations
- **Hooks**: Custom React hooks for data fetching and state
- **Routes**: Protected routes with authentication guards
- **Layout**: Main layout with sidebar navigation

## Database Schema
The MongoDB database includes collections for:
- `products` - Product catalog with variants, pricing, inventory
- `users` - Customer and admin accounts
- `orders` - Purchase orders and order items
- `stocks` - Inventory tracking
- `payments` - Payment transactions
- `vendors` - Supplier information
- `categories` - Product categorization
- `abandonedCarts` - Cart recovery system
- `whishList` - Customer wishlists

## Environment Configuration
Each app has its own environment configuration:
- API: Database connection, external service APIs
- Frontend: API endpoints, public keys
- Backoffice: API endpoints, authentication settings

## Development Workflow
1. **API First**: Start with API endpoints and data models
2. **Frontend Integration**: Build customer-facing features
3. **Backoffice Management**: Add admin interfaces for content management
4. **Testing**: Manual testing via browser + API documentation
5. **Deployment**: Each app can be deployed independently

## Key Files to Know
- `apps/api/src/index.ts` - API server entry point
- `apps/frontend/app/layout.js` - Next.js root layout
- `apps/backoffice/src/App.tsx` - React app entry point
- `package.json` - Root workspace configuration
- `pnpm-workspace.yaml` - Workspace definition

## Integration Points
- **Authentication**: JWT tokens shared between frontend and API
- **Data Flow**: Frontend/Backoffice → API → MongoDB
- **File Uploads**: Direct API integration for product images
- **Payment Processing**: Frontend checkout → API → Redsys gateway
- **Product Imports**: Automated CSV/FTP integrations for supplier catalogs

## Common Tasks
- **Add New Product**: Backoffice → Products → Create (with image upload)
- **Process Orders**: Backoffice → Orders → Update status/tracking
- **User Management**: Backoffice → Users → Roles and permissions
- **Inventory Updates**: Stock management via API or bulk imports
- **Payment Configuration**: Redsys gateway settings in API config

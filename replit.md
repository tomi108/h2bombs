# H2 Bombs Landing Page

## Overview

H2 Bombs is a premium wellness startup selling hydrogen bath bombs. This is a single-page landing website built to capture waitlist signups for their product launch (Q1 2026). The site features an ultra-minimalist design inspired by Japanese skincare brands like Tatcha and Shiseido, with extreme white space, soft lavender (#E6E0FF) and ice-blue accents.

The application is a full-stack web application with:
- **Frontend**: React with TypeScript, Vite for bundling, TailwindCSS for styling, shadcn/ui component library
- **Backend**: Express.js server with TypeScript
- **Purpose**: Collect email addresses for product waitlist with a beautiful, premium landing page experience

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type safety
- Vite as the build tool and dev server for fast hot module replacement
- Single Page Application (SPA) with wouter for lightweight client-side routing
- All frontend code lives in `client/` directory

**Styling Approach**
- TailwindCSS utility-first framework with custom configuration in `tailwind.config.ts`
- shadcn/ui component library (New York style) - a collection of Radix UI primitives styled with Tailwind
- Custom CSS variables for theming defined in `client/src/index.css`
- Design system emphasizes extreme minimalism, premium aesthetic, and generous white space
- Color palette: soft lavender (#E6E0FF) primary, ice-blue gradient backgrounds, pure white base

**Component Architecture**
- Reusable UI components from shadcn/ui stored in `client/src/components/ui/`
- Main landing page at `client/src/pages/landing.tsx`
- Component library includes: Button, Input, Card, Badge, Form controls, Toast notifications, Dialog, and 30+ other primitives
- All components use composition pattern via Radix UI with Slot component for flexibility

**State Management**
- TanStack Query (React Query) for server state management and API calls
- React Hook Form with Zod validation for form handling
- Local component state with React hooks (useState, useEffect)
- Toast notifications via custom hook (`use-toast.ts`) for user feedback

**Animations**
- Framer Motion for smooth animations and transitions
- Floating bubble animation in hero section (5 nano-bubble circles with organic movement)
- Fade-in and stagger animations for content sections

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for API routes
- ESM modules (type: "module" in package.json)
- Server code in `server/` directory

**API Structure**
- RESTful API endpoints:
  - `POST /api/waitlist` - Add email to waitlist
  - `GET /api/waitlist` - Retrieve all waitlist entries (admin)
- Request validation using Zod schemas shared between client and server
- JSON request/response format
- CORS and credential handling configured

**Development Setup**
- Vite middleware mode for hot module replacement during development
- Custom logging middleware for API request tracking
- Error handling and validation at route level
- SSR-ready template serving in development mode

**Data Storage**
- In-memory storage implementation (`MemStorage` class in `server/storage.ts`)
- Interface-based design (`IStorage`) allows easy swapping to database implementation
- Storage handles:
  - Adding waitlist entries with UUID generation
  - Email uniqueness validation
  - Retrieving all entries

**Build & Deployment**
- Production build: `npm run build` compiles frontend (Vite) and backend (esbuild)
- Frontend outputs to `dist/public/`
- Backend bundles to `dist/index.js` as ESM module
- Static file serving in production mode

### Data Schema

**Shared Schema Layer**
- Type definitions shared between frontend and backend in `shared/schema.ts`
- Zod schemas for runtime validation:
  - `insertWaitlistEntrySchema` - validates email input
  - `WaitlistEntry` - TypeScript type for database records
- Drizzle ORM schema definitions for PostgreSQL (prepared for future database integration):
  - `waitlistEntries` table with id (UUID), email (unique), createdAt timestamp

**Type Safety**
- End-to-end type safety from database schema → API → React components
- Drizzle-Zod integration generates Zod schemas from database schema
- TypeScript path aliases (@/, @shared/) for clean imports

### External Dependencies

**UI Component Libraries**
- Radix UI - Unstyled, accessible component primitives (30+ components including Dialog, Dropdown, Toast, Accordion, etc.)
- shadcn/ui - Pre-styled Radix components with Tailwind
- Lucide React - Icon library for UI elements
- cmdk - Command menu component
- embla-carousel-react - Carousel functionality
- vaul - Drawer component

**Form & Validation**
- React Hook Form - Form state management
- @hookform/resolvers - Zod integration for form validation
- Zod - Schema validation library

**Data Fetching**
- TanStack Query (React Query) - Server state management, caching, and data fetching

**Styling & Animation**
- TailwindCSS - Utility-first CSS framework
- class-variance-authority - Type-safe variant management for components
- tailwind-merge & clsx - Conditional class name merging
- Framer Motion - Animation library

**Date Handling**
- date-fns - Modern date utility library

**Database & ORM (Configured but not yet connected)**
- Drizzle ORM - TypeScript ORM for SQL databases
- drizzle-zod - Generate Zod schemas from Drizzle schemas
- @neondatabase/serverless - Neon PostgreSQL serverless driver
- drizzle-kit - Database migration tools
- PostgreSQL dialect configured in `drizzle.config.ts`
- Database credentials expected via `DATABASE_URL` environment variable
- Migration files output to `./migrations/`

**Build Tools**
- Vite - Frontend build tool and dev server
- esbuild - Backend bundling for production
- TypeScript - Type checking and compilation
- PostCSS & Autoprefixer - CSS processing

**Development Tools**
- @replit/vite-plugin-runtime-error-modal - Error overlay for development
- @replit/vite-plugin-cartographer - Code mapping
- @replit/vite-plugin-dev-banner - Development banner

**Fonts**
- Google Fonts (Inter) - Premium sans-serif typography loaded via CDN in `client/index.html`
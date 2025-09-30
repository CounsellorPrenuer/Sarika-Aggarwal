# DreamBridge Portfolio Website

## Overview

DreamBridge is a modern portfolio website for Sarika Agrawal, a career coach and guide. The platform showcases career guidance services, workshops, admission guidance, and provides integrated payment processing for service packages. Built as a single-page application with a vibrant, professional design inspired by modern consulting websites, it emphasizes accessibility and user engagement through smooth animations and responsive layouts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, configured for fast HMR and optimized production builds
- Single-page application (SPA) using Wouter for lightweight client-side routing
- Component-based architecture with reusable UI elements organized in `client/src/components`

**Styling System**
- Tailwind CSS for utility-first styling with custom configuration
- Shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Custom design tokens including vibrant color palette (blue, teal, orange, yellow) defined in CSS variables
- Responsive design with mobile-first approach using Tailwind breakpoints
- Custom animations using Framer Motion for scroll-triggered effects, page transitions, and interactive elements

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and API communication
- React Hook Form with Zod resolvers for form validation and submission
- Local component state using React hooks for UI interactions

**UI Component Library**
- Comprehensive Radix UI primitives for accessible, unstyled components
- Custom-styled components extending Radix primitives (dialogs, dropdowns, tooltips, accordions, etc.)
- Toast notifications system for user feedback
- Form components with built-in validation and error handling

### Backend Architecture

**Server Framework**
- Express.js server handling API routes and serving static assets
- Custom middleware for request logging and error handling
- Development mode integrates Vite middleware for HMR

**API Design**
- RESTful API endpoints under `/api` prefix
- Contact form submission endpoint (`/api/contact`)
- Payment verification endpoint (`/api/payment/verify`) for Razorpay integration
- JSON request/response format with validation using Zod schemas

**Database Layer**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (via Neon serverless driver)
- Schema-first design with migrations managed through Drizzle Kit
- Two main tables:
  - `contacts`: Stores user inquiries (name, email, phone, message)
  - `payments`: Stores payment transactions with Razorpay integration details
- UUID primary keys with automatic timestamp tracking

**Storage Pattern**
- Repository pattern implemented via `IStorage` interface
- `DbStorage` class provides concrete implementation for database operations
- Type-safe insert and query operations using Drizzle ORM
- Centralized data access through storage module

### External Dependencies

**Payment Gateway**
- Razorpay integration for processing service package payments
- Client-side Razorpay Checkout SDK loaded via CDN
- Server-side signature verification using HMAC SHA256
- Environment variables for API keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`)
- Payment flow: Client initiates → Razorpay processes → Server verifies signature → Database stores transaction

**Database Service**
- Neon serverless PostgreSQL database
- Connection via `DATABASE_URL` environment variable
- HTTP-based connection for serverless compatibility

**External Assets**
- Google Fonts CDN for Poppins and Source Sans Pro typography
- Logo and profile images stored in `attached_assets` directory
- Images referenced through Vite's asset import system

**Development Tools**
- Replit-specific plugins for development banner, error overlay, and cartographer (development only)
- ESBuild for server-side bundling in production builds

**Third-Party UI Libraries**
- Framer Motion for advanced animations and transitions
- Embla Carousel for testimonial and content carousels
- React Day Picker for calendar/date selection (if needed)
- Lucide React for icon system

**Form & Validation**
- React Hook Form for form state management
- Zod for runtime schema validation
- Drizzle-Zod integration for database schema validation

## Recent Changes (September 30, 2025)

### Backend Implementation Completed
- ✅ Created PostgreSQL database with Neon serverless driver
- ✅ Implemented database schema with `contacts` and `payments` tables
- ✅ Built storage layer using repository pattern with `IStorage` interface
- ✅ Created API routes for contact form submission (`/api/contact`)
- ✅ Implemented Razorpay payment verification endpoint (`/api/payment/verify`)
- ✅ Added HMAC SHA256 signature verification for payment security

### Frontend Integration
- ✅ Connected contact form to backend API with proper validation
- ✅ Integrated real Razorpay payment gateway (replaced mock functionality)
- ✅ Added environment variable support for Razorpay public key
- ✅ Implemented error handling and success notifications for all user interactions
- ✅ Form state management with automatic clearing after successful submission

### Testing & Validation
- ✅ Verified contact form submission stores data in database
- ✅ Confirmed toast notifications display correctly
- ✅ Validated payment flow initialization with Razorpay
- ✅ Tested responsive design across all breakpoints

### Current Status
The DreamBridge portfolio website is now **fully functional** with:
- Beautiful, vibrant UI with smooth animations and glassmorphism effects
- Working contact form that stores inquiries in PostgreSQL database
- Integrated Razorpay payment processing for service packages
- Fully responsive design optimized for mobile, tablet, and desktop
- Production-ready backend with secure payment verification
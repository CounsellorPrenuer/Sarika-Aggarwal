# DreamBridge Portfolio Website

## Overview
DreamBridge is a modern portfolio website for Sarika Agrawal, a career coach and guide. It showcases career guidance services, workshops, and admission guidance, with integrated payment processing for service packages. The platform is a single-page application with a vibrant, professional design emphasizing accessibility, user engagement through smooth animations, and responsive layouts. The project aims to provide a comprehensive online presence for Sarika Agrawal's coaching business, enabling client interaction, service booking, and content dissemination through a built-in blog.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18+ with TypeScript, Vite for bundling.
- **Routing:** Wouter for lightweight client-side routing.
- **Styling:** Tailwind CSS (utility-first), Shadcn/ui (New York style variant), custom design tokens, Framer Motion for animations.
- **State Management:** TanStack Query for server state, React Hook Form with Zod for form validation.
- **UI Components:** Radix UI primitives, custom-styled components, toast notifications.

### Backend
- **Server:** Express.js for API routes and static asset serving.
- **API Design:** RESTful endpoints for contact, payments, and a comprehensive blog system (public and admin CRUD). JSON request/response with Zod validation.
- **Database:** PostgreSQL (Neon serverless driver) with Drizzle ORM for type-safe operations. Key tables include `contacts`, `payments`, `blog_posts`, `services`, and `testimonials`.
- **Storage:** Repository pattern (`IStorage` interface) for centralized data access.
- **Admin Dashboard:** Secure, session-based authentication. Features include 9 KPI metrics, data tables for recent records, CRUD operations for services, testimonials, and blog posts, contact submission management, payment dashboard, and CSV/JSON export functionality.

### System Design Choices
- Single-page application architecture for a seamless user experience.
- Component-based UI for reusability and maintainability.
- Serverless-first database approach for scalability.
- Emphasis on accessibility and responsive design.
- Secure session-based authentication for admin functionality.
- Real-time form validation and user feedback mechanisms.

## External Dependencies

- **Payment Gateway:** Razorpay for processing payments, including client-side SDK and server-side signature verification.
- **Database Service:** Neon serverless PostgreSQL.
- **External Assets:** Google Fonts CDN (Poppins, Source Sans Pro).
- **UI Libraries:** Framer Motion, Embla Carousel, React Day Picker, Lucide React (icons).
- **Form & Validation:** React Hook Form, Zod, Drizzle-Zod.
- **Development Tools:** Replit-specific plugins, ESBuild (server-side bundling).
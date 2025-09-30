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
- Blog API endpoints:
  - Public: `/api/blogs` (all published), `/api/blogs/featured` (3 featured), `/api/blogs/:id` (single post)
  - Admin: `/api/admin/blog` (CRUD operations with authentication)
- JSON request/response format with validation using Zod schemas

**Database Layer**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (via Neon serverless driver)
- Schema-first design with migrations managed through Drizzle Kit
- Main tables:
  - `contacts`: Stores user inquiries (name, email, phone, message)
  - `payments`: Stores payment transactions with Razorpay integration details
  - `blog_posts`: Stores blog posts with title, excerpt, content, category, author, featured flag, status, and timestamps
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

### Admin Dashboard Implementation (September 30, 2025)
- ✅ Created comprehensive admin dashboard at `/admin` route
- ✅ Implemented session-based authentication with secure cookies
- ✅ Built complete CRUD operations for services, testimonials, and blog posts
- ✅ Added contact submissions management (view and delete)
- ✅ Implemented payments dashboard with statistics and transaction history
- ✅ Added CSV export functionality for all data tables
- ✅ Protected all admin API routes with authentication middleware
- ✅ Implemented session regeneration on login to prevent fixation attacks
- ✅ Configured secure cookie settings (httpOnly, sameSite: lax)
- ✅ Redesigned to modern single-page analytics dashboard with 9 distinct KPI metrics
- ✅ Implemented time-window approach for distinct metrics (30-day vs all-time)
- ✅ Added "Export All Data" functionality (JSON format)
- ✅ Sorted data tables by recency (createdAt descending)

### Database Schema Updates
- Added `services` table: id, name, description, price, createdAt
- Added `testimonials` table: id, clientName, testimonialText, rating, createdAt
- Added `blog_posts` table: id, title, excerpt, content, category, author, featured, status, createdAt

### Admin Dashboard Features
**Authentication**
- Session-based authentication with express-session
- Default admin password: `admin123` (configurable via `ADMIN_PASSWORD` env var)
- Login/logout functionality with proper session management
- Protected admin routes with `requireAdmin` middleware

**Analytics Dashboard (Single-Page Design)**
- **9 Distinct KPI Cards** using time-window approach for meaningful metrics:
  1. Total Bookings: All payment attempts (all-time)
  2. Pending: Pending payments (all-time)
  3. Contacted: Contact form submissions in last 30 days
  4. Completed: Successful payments in last 30 days
  5. Contact Forms: All contact form submissions (all-time)
  6. Lead Downloads: Placeholder (0)
  7. Total Payments: All successful payments (all-time)
  8. Revenue: Total revenue from successful payments
  9. Investments: Placeholder (0)
- **4 Data Sections** showing recent records sorted by creation date:
  - Recent Bookings (last 5 payments)
  - Recent Contact Forms (last 5 contacts)
  - Recent Payments (last 5 successful payments)
  - Recent Lead Downloads (placeholder, empty state)
- **Visual Navigation Tabs** (non-functional, for design consistency)

**Export Functionality**
- Individual CSV export for each data table
- "Export All Data" button for comprehensive JSON export
- Client-side generation with proper escaping
- Date-stamped filenames for easy organization
- Toast notifications for successful exports

### Blog System Implementation (September 30, 2025)
- ✅ Enhanced blog_posts schema with excerpt, category, and featured fields
- ✅ Created public blog API routes:
  - `/api/blogs` - Returns all published blog posts
  - `/api/blogs/featured` - Returns up to 3 featured published posts
  - `/api/blogs/:id` - Returns single blog post by ID
- ✅ Created admin blog API routes (with authentication):
  - GET `/api/admin/blog` - Returns all blog posts (any status)
  - POST `/api/admin/blog` - Creates new blog post
  - PUT `/api/admin/blog/:id` - Updates blog post
  - DELETE `/api/admin/blog/:id` - Deletes blog post
- ✅ Updated landing page Blog component to fetch real featured blogs from API
- ✅ Built `/blogs` page with search and category filtering for all published posts
- ✅ Created `/blogs/:id` individual blog post page with full content display
- ✅ Built `/admin/blogs` management interface with:
  - Full CRUD operations (Create, Read, Update, Delete)
  - Dialog-based create/edit forms with validation
  - Featured blog toggle switch
  - Status selection (published/draft)
  - Proper cache invalidation after mutations
- ✅ Added "Manage Blogs" navigation button in Admin Dashboard
- ✅ Fixed API request argument order in blog mutations
- ✅ Comprehensive end-to-end testing completed and passed
- ✅ All blog pages are responsive and follow the vibrant DreamBridge design system

**Blog Features:**
- Landing page displays up to 3 featured blog posts with excerpt and category
- "View All Blogs" button navigates to complete blog listing
- Blog listing page includes search by title and filter by category
- Individual blog posts show full content, author, category, and date
- Admin can manage featured status to control landing page visibility
- Admin can toggle between published/draft status
- Featured blogs displayed with star badge indicator

### Current Status
The DreamBridge portfolio website is now **fully functional** with:
- Beautiful, vibrant UI with smooth animations and glassmorphism effects
- Working contact form that stores inquiries in PostgreSQL database
- Integrated Razorpay payment processing for service packages
- Complete blog management system with public pages and admin CRUD
- Comprehensive admin dashboard for content and data management
- Session-based authentication protecting admin operations
- CSV data export capabilities
- Fully responsive design optimized for mobile, tablet, and desktop

## Production Deployment Checklist

⚠️ **CRITICAL**: The following security improvements are REQUIRED before deploying to production:

### 1. Environment Variables (REQUIRED)
Set these environment variables in production:
- `SESSION_SECRET`: Strong random string (min 32 characters) for session encryption
- `ADMIN_PASSWORD`: Secure admin password (replace default 'admin123')
- `RAZORPAY_KEY_ID`: Razorpay public API key
- `RAZORPAY_KEY_SECRET`: Razorpay secret key
- `DATABASE_URL`: PostgreSQL connection string

### 2. Session Store (REQUIRED)
The current implementation uses MemoryStore which is:
- ❌ Not persistent (sessions lost on server restart)
- ❌ Not suitable for multi-instance deployments
- ❌ Security risk in production

**Action Required**: Replace with persistent session store:
```bash
npm install connect-redis redis
```

Update `server/index.ts` to use Redis:
```typescript
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET!,
  // ... other options
}));
```

### 3. CSRF Protection (REQUIRED)
Admin endpoints currently lack CSRF protection.

**Action Required**: Implement CSRF tokens:
```bash
npm install csurf
```

Add CSRF middleware to admin routes or implement double-submit cookie pattern.

### 4. Rate Limiting (RECOMMENDED)
Add brute-force protection to login endpoint.

**Action Required**:
```bash
npm install express-rate-limit
```

Apply to `/api/admin/login` endpoint with exponential backoff.

### 5. Password Hashing (RECOMMENDED)
Admin password is currently compared in plaintext.

**Action Required**:
```bash
npm install bcrypt
```

Store `ADMIN_PASSWORD_HASH` instead and use bcrypt for comparison.

### 6. Security Headers (RECOMMENDED)
Add security headers using Helmet.

**Action Required**:
```bash
npm install helmet
```

### 7. Data Export Security (RECOMMENDED)
CSV exports may include sensitive internal fields (e.g., razorpaySignature).

**Action Required**: Explicitly map exported columns and exclude sensitive fields.

### Development vs Production
The current implementation is **fully functional for development** and includes:
- ✅ Session regeneration on login
- ✅ Secure cookie configuration
- ✅ Trust proxy configuration
- ✅ All admin routes protected with authentication
- ✅ Environment variable warnings for missing security configs

However, production deployment requires the above security hardening steps.
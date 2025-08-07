# Replit.md

## Overview

This is a personal portfolio website for Jit Goria, a Product and Engineering Leader. The application is built as a full-stack web application with a React frontend and Express backend, showcasing professional experience, skills, and providing a contact form for potential clients or employers. The site serves as a digital resume and professional presence with modern UI components and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React Query (TanStack Query) for server state management and API calls
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for contact form submission and data retrieval
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request/response logging

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL for cloud hosting
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Fallback Storage**: In-memory storage implementation for development/testing

### Authentication and Authorization
- **Current State**: No authentication system implemented (public portfolio site)
- **Session Management**: Basic session configuration prepared but not actively used
- **Future Consideration**: Could be extended for admin panel access to view contact submissions

### Build and Development
- **Build System**: Vite for frontend bundling with React plugin support
- **Backend Build**: ESBuild for server-side TypeScript compilation
- **Development**: Hot module replacement and development server setup
- **Type Checking**: Strict TypeScript configuration across all modules

### Project Structure
- **Monorepo Setup**: Single repository with separated client, server, and shared code
- **Shared Schema**: Common TypeScript types and Zod schemas shared between frontend and backend
- **Asset Management**: Vite-based asset handling with proper import aliases

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect

### UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Modern icon library for consistent iconography
- **Shadcn/ui**: Pre-built component library built on Radix UI

### Development Tools
- **Vite**: Fast build tool with development server and HMR
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: High-performance bundler for production builds
- **React Query**: Data fetching and caching library

### Runtime Dependencies
- **Express.js**: Web application framework for Node.js
- **React**: Frontend framework with hooks and modern patterns
- **Wouter**: Minimalist routing solution for React applications
- **Date-fns**: Date manipulation and formatting utilities

### Development Environment
- **Replit Integration**: Special development plugins and error handling for Replit environment
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins
- **Connect-pg-simple**: PostgreSQL session store (configured but not actively used)
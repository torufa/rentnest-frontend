# RentNest

A full-stack rental marketplace application built with **Next.js, TypeScript, Tailwind CSS, and a RESTful backend API**.

RentNest connects **Tenants, Landlords, and Admins** through a role-based rental management platform.

---

## Features

### Tenant

* Browse available properties
* View property details
* Submit rental requests
* Track rental request history
* View individual rental request details
* Pay for approved rental requests
* View payment history
* Submit property reviews and ratings
* View review history
* Manage profile

### Landlord

* View landlord dashboard
* Create properties
* Edit properties
* Delete properties
* View owned properties
* View incoming rental requests
* View rental request details
* Approve or reject rental requests

### Admin

* View admin dashboard
* View all registered users
* Block or activate user accounts
* View all properties
* View all rental requests
* Manage property categories

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Radix UI
* Lucide React
* Sonner
* React Server Components
* Next.js Server Actions

### Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* REST API
* JWT Authentication

---

## Project Structure

```text
app/
├── (authGroup)/
│   ├── login/
│   └── register/
│
├── (dashboard)/
│   ├── admin/
│   ├── landlord/
│   └── tenant/
│
└── (publicGroup)/
    ├── properties/
    │   └── [id]/
    ├── contact/
    └── profile/
```

---

## User Roles

| Role     | Responsibilities                                                     |
| -------- | -------------------------------------------------------------------- |
| TENANT   | Browse properties, request rentals, make payments and submit reviews |
| LANDLORD | Manage properties and rental requests                                |
| ADMIN    | Manage users and monitor platform-wide properties and rentals        |

---

## Main Application Flow

```text
User Registration / Login
          ↓
      Authentication
          ↓
      Role Detection
          ↓
 ┌────────┼─────────┐
 ↓        ↓         ↓
Tenant  Landlord   Admin
 ↓        ↓         ↓
Rental   Property  Platform
Request  Management Management
 ↓        ↓         ↓
Payment  Requests  Users
 ↓        ↓         ↓
Review   Approval  Properties
History  /Reject   Rentals
```

---

## API Integration

The frontend communicates with the backend through REST API endpoints.

Detailed endpoint mapping is available in:

**`API_INTEGRATION.md`**

---

## UI Features

* Responsive dashboard layouts
* Dark/light theme support
* Loading skeletons
* Toast notifications
* Error handling
* Responsive tables
* Property cards
* Rental request cards
* Review history
* Payment history
* Role-based navigation
* Protected dashboard routes

---

## Authentication & Authorization

RentNest uses JWT-based authentication with role-based access control.

Protected areas include:

```text
/tenant/*
/landlord/*
/admin/*
```

Access to dashboard features depends on the authenticated user's role.

---

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create the environment file:

```env
BACKEND_API_URL=your_backend_api_url
```

Start the development server:

```bash
pnpm dev
```

The application will run on the configured local development port.

---

## Project Status

### Completed

* Authentication flow
* Public property browsing
* Property details
* Tenant rental requests
* Rental request history
* Rental request details
* Landlord property management
* Property creation
* Property editing
* Property deletion
* Landlord rental request management
* Rental request approval/rejection
* Tenant payment flow
* Payment success UI
* Payment history
* Review creation
* Review history
* Admin user management
* Admin user status update
* Admin property listing
* Admin rental request listing
* Tenant dashboard
* Landlord dashboard
* Admin dashboard
* Loading skeletons
* Error handling
* Responsive UI

---

## Author

**Torufa Toma**

Full-Stack Web Developer

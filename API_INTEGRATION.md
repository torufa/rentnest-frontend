# RentNest - API Integration Documentation

This document provides a mapping of the **RentNest Next.js App Router frontend** to its corresponding backend API endpoints.

---

## 1. Authentication & Public Routes

| Route              | Feature           | API Endpoint          | Method | Description                                                          |
| ------------------ | ----------------- | --------------------- | ------ | -------------------------------------------------------------------- |
| `/register`        | User Registration | `/api/auth/register`  | POST   | Registers a new Tenant or Landlord account.                          |
| `/login`           | User Login        | `/api/auth/login`     | POST   | Authenticates the user and creates the authenticated session.        |
| `/profile`         | User Profile      | `/api/auth/me`        | GET    | Retrieves the currently authenticated user's information.            |
| `/properties`      | Property Listing  | `/api/properties`     | GET    | Retrieves public properties with available filtering/search options. |
| `/properties/[id]` | Property Details  | `/api/properties/:id` | GET    | Retrieves details of a specific property.                            |
| `/contact`         | Contact Page      | —                     | —      | Static frontend page; no backend API integration.                    |

---

## 2. Tenant Routes

| Route                                 | Feature                | API Endpoint       | Method | Description                                                     |
| ------------------------------------- | ---------------------- | ------------------ | ------ | --------------------------------------------------------------- |
| `/tenant/dashboard`                   | Tenant Dashboard       | Multiple APIs      | GET    | Displays tenant-related rental, payment and review information. |
| `/tenant/requests`                    | Rental Request History | `/api/rentals`     | GET    | Retrieves rental requests submitted by the logged-in tenant.    |
| `/tenant/requests/[id]`               | Rental Request Details | `/api/rentals/:id` | GET    | Retrieves details of a specific rental request.                 |
| `/tenant/requests/[id]`               | Create Rental Request  | `/api/rentals`     | POST   | Submits a rental request for a property.                        |
| `/tenant/requests/[id]/payment`       | Payment                | Payment API        | POST   | Initiates payment for an approved rental request.               |
| `/tenant/payments`                    | Payment History        | `/api/payments`    | GET    | Displays the tenant's payment history.                          |
| `/tenant/requests/[id]/review/create` | Create Review          | `/api/reviews`     | POST   | Allows a tenant to submit a review and rating for a rental.     |
| `/tenant/requests/reviews`            | Review History         | `/api/reviews`     | GET    | Retrieves reviews submitted by the logged-in tenant.            |

---

## 3. Landlord Routes

| Route                            | Feature                | API Endpoint                   | Method | Description                                               |
| -------------------------------- | ---------------------- | ------------------------------ | ------ | --------------------------------------------------------- |
| `/landlord/dashboard`            | Landlord Dashboard     | Multiple APIs                  | GET    | Displays landlord property and rental request statistics. |
| `/landlord/properties`           | Property Management    | `/api/landlord/properties`     | GET    | Retrieves properties owned by the logged-in landlord.     |
| `/landlord/properties/create`    | Create Property        | `/api/landlord/properties`     | POST   | Creates a new property listing.                           |
| `/landlord/properties/[id]/edit` | Edit Property          | `/api/landlord/properties/:id` | PATCH  | Updates an existing property.                             |
| `/landlord/properties/[id]`      | Delete Property        | `/api/landlord/properties/:id` | DELETE | Deletes a landlord-owned property.                        |
| `/landlord/requests`             | Rental Requests        | `/api/landlord/requests`       | GET    | Retrieves rental requests for the landlord's properties.  |
| `/landlord/requests/[id]`        | Request Details        | `/api/landlord/requests/:id`   | GET    | Retrieves a specific rental request.                      |
| `/landlord/requests/[id]`        | Approve/Reject Request | `/api/landlord/requests/:id`   | PATCH  | Approves or rejects a tenant rental request.              |

---

## 4. Admin Routes

| Route               | Feature                   | API Endpoint            | Method | Description                                        |
| ------------------- | ------------------------- | ----------------------- | ------ | -------------------------------------------------- |
| `/admin/dashboard`  | Admin Dashboard           | Multiple APIs           | GET    | Displays platform-wide administrative information. |
| `/admin/users`      | User Management           | `/api/admin/users`      | GET    | Retrieves all registered users.                    |
| `/admin/users`      | Update User Status        | `/api/admin/users/:id`  | PATCH  | Activates or blocks a user account.                |
| `/admin/properties` | Property Management       | `/api/admin/properties` | GET    | Retrieves all properties across the platform.      |
| `/admin/rentals`    | Rental Request Management | `/api/admin/rentals`    | GET    | Retrieves all rental requests across the platform. |

---

## 5. Category Integration

| Feature             | API Endpoint      | Method | Description                              |
| ------------------- | ----------------- | ------ | ---------------------------------------- |
| Property Categories | `/api/categories` | GET    | Retrieves available property categories. |
| Create Category     | `/api/categories` | POST   | Creates a new property category.         |

---

## 6. UI & API Feedback Strategy

### Toast Notifications

`sonner` is used to provide feedback for:

* Successful API operations
* Failed API requests
* Authentication errors
* Rental request actions
* Payment operations
* User status updates

### Loading States

Skeleton components are used for asynchronous data-fetching screens, including:

* Property lists
* Property details
* Rental requests
* Admin rental requests
* Admin user management
* Dashboard sections

### Error Handling

Route-level `error.tsx` files are used to handle unexpected rendering or server-side errors and provide recovery options.

### Authentication

Protected dashboard routes use the application's authentication/proxy system to restrict access according to user roles:

* `TENANT`
* `LANDLORD`
* `ADMIN`

---

## 7. Backend Integration Pattern

Frontend Server Actions are used as the primary integration layer between the Next.js frontend and backend APIs.

Typical flow:

```text
Next.js Page
     ↓
Server Action
     ↓
Backend REST API
     ↓
JSON Response
     ↓
Server Component / Client Component
     ↓
UI
```

Authenticated requests use the application's authentication headers/cookies when communicating with protected backend endpoints.

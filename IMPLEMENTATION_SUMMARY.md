# Implementation Summary: Dynamic Menu System Based on User Permissions

## Overview
This implementation adds a dynamic menu system that displays menu items based on user roles and permissions stored in a database. The menus are fetched during login and personalized for each user.

## Key Changes

### 1. Database Schema Extensions (`lib/db.ts`)
Added four new tables to support the menu permission system:

- **`user_roles`**: Stores role definitions (e.g., admin, manager, user)
- **`menu_items`**: Stores menu configuration (label, href, icon, order, active status)
- **`role_menu_permissions`**: Links roles to menu items (many-to-many relationship)
- **`user_role_assignments`**: Assigns roles to users based on their email

Added new function:
- `getMenuItemsForUser(userEmail)`: Retrieves menu items a user can access based on their role

### 2. Authentication Enhancement (`lib/auth.ts`)
Updated NextAuth configuration to:
- Query user role assignment during session creation
- Store `roleId` in the session object for quick access
- Use a session callback to fetch role information from the database

### 3. TypeScript Type Extensions (`types/next-auth.d.ts`)
Extended NextAuth types to include:
- `roleId` in User interface
- `roleId` in Session interface

### 4. Dynamic Dashboard Layout (`app/(dashboard)/layout.tsx`)
Transformed the layout from static to dynamic:
- Made the layout component async to fetch data server-side
- Retrieve user's email from session
- Fetch personalized menu items using `getMenuItemsForUser()`
- Pass menu items to both `DesktopNav` and `MobileNav` components
- Added helper function `getIconComponent()` to dynamically render Lucide icons by name

### 5. API Routes
Created two new API endpoints:

**`/api/seed-menu`** (GET):
- Initializes the database with default roles, menu items, and permissions
- Creates 3 roles: admin, manager, user
- Creates 5 menu items: Dashboard, Orders, Products, Customers, Analytics
- Sets up permissions for each role

**`/api/assign-role`** (GET/POST):
- GET: Lists all user role assignments
- POST: Assigns or updates a user's role based on their email

### 6. Documentation (`MENU_SETUP.md`)
Comprehensive setup guide including:
- SQL schema definitions
- Step-by-step setup instructions
- Role permission descriptions
- API usage examples
- Customization guidelines

## How It Works

1. **Login Flow**:
   - User logs in via GitHub OAuth
   - NextAuth session callback queries `user_role_assignments` table
   - User's `roleId` is stored in session

2. **Menu Rendering**:
   - Dashboard layout fetches user session
   - Calls `getMenuItemsForUser()` with user's email
   - Function joins tables to get permitted menu items
   - Menu items are filtered by role and sorted by order
   - Dynamic menu is rendered in both desktop and mobile navigation

3. **Icon Rendering**:
   - Icon names stored as strings in database (e.g., "Home", "Package")
   - Dynamic lookup in Lucide Icons library
   - Fallback to Package icon if icon name not found

## Default Role Permissions

- **Admin (roleId: 1)**: Full access - All 5 menu items
- **Manager (roleId: 2)**: Dashboard, Products, Customers (3 items)
- **User (roleId: 3)**: Dashboard, Products (2 items)

## Setup Process for Developers

1. Run SQL schema creation in Postgres database
2. Call `/api/seed-menu` to populate initial data
3. Call `/api/assign-role` with POST to assign users to roles
4. Login via GitHub OAuth
5. Menu items will display based on assigned role

## Benefits

- **Flexible**: Menu configuration in database, no code changes needed
- **Scalable**: Easy to add new roles, menu items, or permissions
- **Secure**: Menu filtering happens server-side
- **Maintainable**: Clear separation of concerns
- **User-friendly**: Personalized experience based on permissions

## Technical Decisions

1. **Server-side rendering**: Menu fetched on server to prevent client-side exposure
2. **Email-based assignment**: Uses GitHub OAuth email for user identification
3. **Drizzle ORM**: Consistent with existing codebase
4. **Dynamic icons**: Flexible icon system without hardcoding
5. **Type safety**: Full TypeScript support with proper interfaces

## Future Enhancements

Potential improvements:
- Role hierarchy system
- Menu item visibility rules (beyond role)
- User group support
- Menu item sorting/ordering UI
- Audit logging for permission changes
- Multi-role support per user
- Role-based route protection middleware

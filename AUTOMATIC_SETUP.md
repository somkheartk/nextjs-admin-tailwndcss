# Automatic Database Setup

## Overview

The application has been updated to automatically initialize the database without requiring manual setup steps. This eliminates the need to:
- Manually run SQL migration scripts
- Hit seed endpoints before using the app
- Manually assign roles to users

## What Changed

### 1. New Database Initialization Module (`lib/db-init.ts`)

A new module that automatically:
- **Checks if required tables exist** - Queries the database to verify all necessary tables are present
- **Creates missing tables** - If tables don't exist, creates them with proper schema and indexes
- **Seeds initial data** - Automatically populates default roles, menu items, and permissions
- **Is idempotent** - Safe to run multiple times; skips actions if data already exists
- **Handles errors gracefully** - Logs errors but doesn't crash the application

### 2. Updated Database Functions (`lib/db.ts`)

Enhanced the `getMenuItemsForUser` function to:
- **Auto-assign roles to new users** - When a user logs in for the first time, they are automatically assigned the "user" role
- **Handle missing data gracefully** - Returns empty menu array instead of throwing errors
- **Log role assignments** - Console logs when a user is auto-assigned a role for debugging

### 3. Updated Dashboard Layout (`app/(dashboard)/layout.tsx`)

Modified to:
- **Call initialization on every page load** - Ensures database is ready (cached after first call)
- **Initialize before fetching menus** - Guarantees tables exist before querying them

### 4. Updated Seed Menu Endpoint (`app/api/seed-menu/route.ts`)

Enhanced to:
- **Check for existing data** - Queries the database to see if seeding is needed
- **Return appropriate status** - Indicates whether data was seeded or already exists
- **Be truly idempotent** - Can be called multiple times safely

### 5. Updated Documentation

- **README.md** - Highlights automatic setup as the primary method, with manual steps as optional
- **MENU_SETUP.md** - Emphasizes automatic initialization and simplified role assignment

## How It Works

### Initialization Flow

1. **User accesses the application**
2. **Layout calls `initializeDatabase()`**
   - Checks if already initialized (cached in memory)
   - Verifies tables exist by querying them
   - Creates tables if missing
   - Checks if data needs seeding
   - Seeds initial data if needed
3. **User authentication happens**
4. **`getMenuItemsForUser()` is called**
   - Looks up user's role assignment
   - If no role exists, assigns "user" role automatically
   - Fetches and returns menu items for the user's role

### Table Creation

The following tables are created automatically:

- **user_roles** - Stores role definitions (admin, manager, user)
- **menu_items** - Stores menu item configurations
- **role_menu_permissions** - Maps which roles can see which menus
- **user_role_assignments** - Maps users to their assigned roles

### Default Data Seeded

**Roles:**
- Admin (ID: 1) - Full access to all features
- Manager (ID: 2) - Access to most features
- User (ID: 3) - Limited access

**Menu Items:**
1. Dashboard
2. Orders
3. Products
4. Customers
5. Analytics

**Permissions:**
- Admin: All menus
- Manager: Dashboard, Products, Customers
- User: Dashboard, Products

## Benefits

1. **Zero manual setup required** - Just configure your database connection and run
2. **Developer-friendly** - No need to remember SQL scripts or seed commands
3. **Production-ready** - Works in any environment (local, staging, production)
4. **Idempotent** - Safe to deploy and redeploy without breaking
5. **User-friendly** - New users automatically get appropriate access
6. **Error-resilient** - Gracefully handles missing database or configuration

## Migration from Manual Setup

If you previously set up the database manually:
- **No action required** - The automatic system detects existing data and skips initialization
- **Your data is safe** - No tables or data are dropped or modified
- **Role assignments preserved** - Existing user role assignments remain unchanged

## Optional Manual Control

You can still:
- **Run the SQL script directly** - Use `database-migration.sql` for manual control
- **Use the seed endpoint** - Visit `/api/seed-menu` (now idempotent)
- **Assign specific roles** - Use `/api/assign-role` to upgrade users to admin/manager

## Error Handling

The initialization system:
- **Logs errors to console** - Check server logs if issues occur
- **Doesn't crash the app** - Allows application to run with degraded functionality
- **Provides clear messages** - Indicates what went wrong and where

## Performance

- **Cached after first run** - Initialization check is fast on subsequent requests
- **Minimal overhead** - Only queries the database once to check for tables
- **No impact on normal operations** - After initialization, no extra queries are made

## Testing

To verify the automatic setup works:

1. **Start with a clean database** (optional - works with existing data too)
2. **Configure `POSTGRES_URL` in `.env`**
3. **Run the application** with `pnpm dev`
4. **Log in with GitHub OAuth**
5. **Verify:**
   - Tables are created automatically (check database)
   - Default data is seeded (check tables for roles and menu items)
   - You are assigned the "user" role automatically
   - Menu items appear in the navigation

Check server console logs for initialization messages:
```
Creating database tables...
Database tables created successfully
Seeding initial data...
Initial data seeded successfully
Auto-assigned user role to user@example.com
```

## Troubleshooting

### Issue: "POSTGRES_URL environment variable is not set"
- **Solution:** Set `POSTGRES_URL` in your `.env` file

### Issue: No menu items appear after login
- **Causes:**
  - Database connection failed
  - Tables weren't created (check console logs)
  - User email doesn't match GitHub OAuth email
- **Solution:** Check server console logs for errors

### Issue: Want to assign admin role to myself
- **Solution:** Use the role assignment API:
  ```bash
  curl -X POST http://localhost:3000/api/assign-role \
    -H "Content-Type: application/json" \
    -d '{"userEmail": "your-email@example.com", "roleId": 1}'
  ```

## Future Enhancements

Possible improvements:
- Drizzle Kit integration for migrations
- Admin UI for role management
- Configurable default role assignment
- Database migration versioning

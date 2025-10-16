# Menu and Permission System Setup

This application now supports dynamic menus based on user roles and permissions stored in the database.

## Database Schema

The following tables need to be created in your Postgres database:

### 1. User Roles Table
```sql
CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);
```

### 2. Menu Items Table
```sql
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  icon TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);
```

### 3. Role Menu Permissions Table
```sql
CREATE TABLE role_menu_permissions (
  id SERIAL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES user_roles(id),
  menu_item_id INTEGER NOT NULL REFERENCES menu_items(id)
);
```

### 4. User Role Assignments Table
```sql
CREATE TABLE user_role_assignments (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  role_id INTEGER NOT NULL REFERENCES user_roles(id)
);
```

## Setup Instructions

1. **Create the database tables** using one of these methods:
   
   **Option A: Run the SQL migration script**
   ```bash
   # In your database client or Vercel Postgres dashboard
   # Execute the contents of database-migration.sql
   ```
   
   **Option B: Manually create tables** using the SQL commands above in your Vercel Postgres dashboard or your database client.

2. **Seed the menu and permission data** (if not using the SQL migration script):
   Visit:
   ```
   http://localhost:3000/api/seed-menu
   ```

   This will create:
   - 3 default roles: admin, manager, user
   - 5 menu items: Dashboard, Orders, Products, Customers, Analytics
   - Permissions for each role

3. **Assign a role to your user** by making a POST request:
   ```bash
   curl -X POST http://localhost:3000/api/assign-role \
     -H "Content-Type: application/json" \
     -d '{"userEmail": "your-github-email@example.com", "roleId": 1}'
   ```

   Or view current assignments:
   ```bash
   curl http://localhost:3000/api/assign-role
   ```

## Role Permissions

By default:
- **Admin (roleId: 1)**: All menu items (Dashboard, Orders, Products, Customers, Analytics)
- **Manager (roleId: 2)**: Dashboard, Products, Customers
- **User (roleId: 3)**: Dashboard, Products

## How It Works

1. When a user logs in via GitHub OAuth, their email is used to look up their role assignment
2. The role assignment is stored in the session
3. The dashboard layout fetches menu items based on the user's role
4. Only authorized menu items are displayed in the navigation

## Customization

You can customize menu items, roles, and permissions directly in the database or by modifying the seed script at `app/api/seed-menu/route.ts`.

### Available Icons

The system uses Lucide React icons. Available icon names include:
- Home
- ShoppingCart
- Package
- Users2
- LineChart
- Settings
- BarChart
- FileText
- And many more from the lucide-react library

# Menu and Permission System Setup

This application now supports dynamic menus based on user roles and permissions stored in the database.

## 🎉 Automatic Setup (Recommended)

**Good news!** The application now automatically handles database setup. No manual SQL scripts required!

When you first run the application:

1. **Tables are created automatically** if they don't exist
2. **Initial data is seeded automatically** (roles, menu items, permissions)
3. **New users are auto-assigned** the "user" role on first login

Simply configure your database connection and start the app:

```bash
# Set up your .env file with POSTGRES_URL
pnpm install
pnpm dev
```

That's it! The database will be initialized automatically on first access.

## Default User Roles

All new users are automatically assigned the **"user"** role, which gives them access to:
- Dashboard
- Products

To upgrade a user to **admin** or **manager**, use the role assignment API:

```bash
# Assign admin role (access to all features)
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "your-email@example.com", "roleId": 1}'

# Assign manager role
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "your-email@example.com", "roleId": 2}'
```

## Role Permissions

By default:
- **Admin (roleId: 1)**: All menu items (Dashboard, Orders, Products, Customers, Analytics)
- **Manager (roleId: 2)**: Dashboard, Products, Customers
- **User (roleId: 3)**: Dashboard, Products

## Manual Setup (Optional)

If you prefer to manually set up the database (e.g., for production deployments with migration tools), you can still use the SQL script or API endpoints.

### Option A: SQL Migration Script

Run `database-migration.sql` in your database client:

```bash
# In your database client or Vercel Postgres dashboard
# Execute the contents of database-migration.sql
```

### Option B: API Endpoint

Visit the seed endpoint:
```
http://localhost:3000/api/seed-menu
```

This endpoint is idempotent - it will skip seeding if data already exists.

## Database Schema

## Database Schema

The application uses the following tables (created automatically on first run):

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

## How It Works

1. When a user logs in via GitHub OAuth, their email is used to look up their role assignment
2. If no role exists, the system automatically assigns them the "user" role
3. The dashboard layout fetches menu items based on the user's role
4. Only authorized menu items are displayed in the navigation

All of this happens automatically without any manual intervention!

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

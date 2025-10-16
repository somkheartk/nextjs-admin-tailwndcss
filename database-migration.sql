-- SQL Migration Script for Dynamic Menu System
-- Run this script in your Postgres database to create the necessary tables

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  icon TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create role_menu_permissions table
CREATE TABLE IF NOT EXISTS role_menu_permissions (
  id SERIAL PRIMARY KEY,
  role_id INTEGER NOT NULL REFERENCES user_roles(id) ON DELETE CASCADE,
  menu_item_id INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Create user_role_assignments table
CREATE TABLE IF NOT EXISTS user_role_assignments (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  role_id INTEGER NOT NULL REFERENCES user_roles(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_role_assignments_email ON user_role_assignments(user_email);
CREATE INDEX IF NOT EXISTS idx_role_menu_permissions_role ON role_menu_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_menu_permissions_menu ON role_menu_permissions(menu_item_id);

-- Insert default roles
INSERT INTO user_roles (id, name, description) VALUES
  (1, 'admin', 'Full access to all features'),
  (2, 'manager', 'Access to most features'),
  (3, 'user', 'Limited access')
ON CONFLICT (name) DO NOTHING;

-- Insert default menu items
INSERT INTO menu_items (id, label, href, icon, "order", is_active) VALUES
  (1, 'Dashboard', '#', 'Home', 1, true),
  (2, 'Orders', '#', 'ShoppingCart', 2, true),
  (3, 'Products', '/', 'Package', 3, true),
  (4, 'Customers', '/customers', 'Users2', 4, true),
  (5, 'Analytics', '#', 'LineChart', 5, true)
ON CONFLICT (id) DO NOTHING;

-- Insert role-menu permissions for admin (all menus)
INSERT INTO role_menu_permissions (role_id, menu_item_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5)
ON CONFLICT DO NOTHING;

-- Insert role-menu permissions for manager (Dashboard, Products, Customers)
INSERT INTO role_menu_permissions (role_id, menu_item_id) VALUES
  (2, 1), (2, 3), (2, 4)
ON CONFLICT DO NOTHING;

-- Insert role-menu permissions for user (Dashboard, Products)
INSERT INTO role_menu_permissions (role_id, menu_item_id) VALUES
  (3, 1), (3, 3)
ON CONFLICT DO NOTHING;

-- NOTE: After running this script, you need to assign your GitHub user email to a role
-- Example (replace with your actual email):
-- INSERT INTO user_role_assignments (user_email, role_id) VALUES ('your-email@example.com', 1);

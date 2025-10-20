import 'server-only';
import { db } from './db';
import { sql } from 'drizzle-orm';

// Track initialization state to avoid repeated checks
let _isInitialized = false;
let _isInitializing = false;
let _initializationPromise: Promise<void> | null = null;

/**
 * Initialize database tables and seed initial data if needed.
 * This runs automatically and is idempotent - safe to call multiple times.
 * Safe to call during runtime - will not execute during build time.
 */
export async function initializeDatabase(): Promise<void> {
  // Skip if already initialized
  if (_isInitialized) {
    return;
  }

  // If already initializing, wait for that to complete
  if (_isInitializing && _initializationPromise) {
    return _initializationPromise;
  }

  _isInitializing = true;
  _initializationPromise = performInitialization();
  
  try {
    await _initializationPromise;
  } finally {
    _isInitializing = false;
    _initializationPromise = null;
  }
}

async function performInitialization(): Promise<void> {
  try {
    // Check if tables exist by trying to query them
    const tablesExist = await checkTablesExist();

    if (!tablesExist) {
      console.log('Creating database tables...');
      await createTables();
      console.log('Database tables created successfully');
    }

    // Check if data needs to be seeded
    const needsSeeding = await checkNeedsSeeding();

    if (needsSeeding) {
      console.log('Seeding initial data...');
      await seedInitialData();
      console.log('Initial data seeded successfully');
    }

    _isInitialized = true;
  } catch (error) {
    console.error('Database initialization error:', error);
    // Don't throw - allow app to continue with degraded functionality
  }
}

async function checkTablesExist(): Promise<boolean> {
  try {
    // Try to query all required tables
    await db.execute(sql`SELECT 1 FROM user_roles LIMIT 1`);
    await db.execute(sql`SELECT 1 FROM menu_items LIMIT 1`);
    await db.execute(sql`SELECT 1 FROM role_menu_permissions LIMIT 1`);
    await db.execute(sql`SELECT 1 FROM user_role_assignments LIMIT 1`);
    return true;
  } catch (error) {
    return false;
  }
}

async function checkNeedsSeeding(): Promise<boolean> {
  try {
    const result = await db.execute(
      sql`SELECT COUNT(*) as count FROM user_roles`
    );
    const count = (result.rows[0] as any)?.count || 0;
    return count === 0;
  } catch (error) {
    return false;
  }
}

async function createTables(): Promise<void> {
  // Create user_roles table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS user_roles (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT
    )
  `);

  // Create menu_items table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS menu_items (
      id SERIAL PRIMARY KEY,
      label TEXT NOT NULL,
      href TEXT NOT NULL,
      icon TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true
    )
  `);

  // Create role_menu_permissions table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS role_menu_permissions (
      id SERIAL PRIMARY KEY,
      role_id INTEGER NOT NULL REFERENCES user_roles(id) ON DELETE CASCADE,
      menu_item_id INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE
    )
  `);

  // Create user_role_assignments table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS user_role_assignments (
      id SERIAL PRIMARY KEY,
      user_email TEXT NOT NULL,
      role_id INTEGER NOT NULL REFERENCES user_roles(id) ON DELETE CASCADE
    )
  `);

  // Create indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_user_role_assignments_email 
    ON user_role_assignments(user_email)
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_role_menu_permissions_role 
    ON role_menu_permissions(role_id)
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_role_menu_permissions_menu 
    ON role_menu_permissions(menu_item_id)
  `);
}

async function seedInitialData(): Promise<void> {
  // Insert default roles
  await db.execute(sql`
    INSERT INTO user_roles (id, name, description) VALUES
      (1, 'admin', 'Full access to all features'),
      (2, 'manager', 'Access to most features'),
      (3, 'user', 'Limited access')
    ON CONFLICT (name) DO NOTHING
  `);

  // Insert default menu items
  await db.execute(sql`
    INSERT INTO menu_items (id, label, href, icon, "order", is_active) VALUES
      (1, 'Dashboard', '#', 'Home', 1, true),
      (2, 'Orders', '#', 'ShoppingCart', 2, true),
      (3, 'Products', '/', 'Package', 3, true),
      (4, 'Customers', '/customers', 'Users2', 4, true),
      (5, 'Analytics', '#', 'LineChart', 5, true)
    ON CONFLICT (id) DO NOTHING
  `);

  // Insert role-menu permissions for admin (all menus)
  await db.execute(sql`
    INSERT INTO role_menu_permissions (role_id, menu_item_id) 
    SELECT 1, id FROM menu_items
    ON CONFLICT DO NOTHING
  `);

  // Insert role-menu permissions for manager (Dashboard, Products, Customers)
  await db.execute(sql`
    INSERT INTO role_menu_permissions (role_id, menu_item_id) VALUES
      (2, 1), (2, 3), (2, 4)
    ON CONFLICT DO NOTHING
  `);

  // Insert role-menu permissions for user (Dashboard, Products)
  await db.execute(sql`
    INSERT INTO role_menu_permissions (role_id, menu_item_id) VALUES
      (3, 1), (3, 3)
    ON CONFLICT DO NOTHING
  `);
}

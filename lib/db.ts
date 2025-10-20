import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial,
  boolean
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, inArray } from 'drizzle-orm';
import { asc } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

// Lazy initialization of database connection
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error('POSTGRES_URL environment variable is not set');
    }
    _db = drizzle(neon(connectionString));
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

// User roles table
export const userRoles = pgTable('user_roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description')
});

export type SelectUserRole = typeof userRoles.$inferSelect;

// Menu items table
export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  href: text('href').notNull(),
  icon: text('icon').notNull(),
  order: integer('order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true)
});

export type SelectMenuItem = typeof menuItems.$inferSelect;

// Role-menu permissions table
export const roleMenuPermissions = pgTable('role_menu_permissions', {
  id: serial('id').primaryKey(),
  roleId: integer('role_id')
    .notNull()
    .references(() => userRoles.id),
  menuItemId: integer('menu_item_id')
    .notNull()
    .references(() => menuItems.id)
});

// User-role assignments table
export const userRoleAssignments = pgTable('user_role_assignments', {
  id: serial('id').primaryKey(),
  userEmail: text('user_email').notNull(),
  roleId: integer('role_id')
    .notNull()
    .references(() => userRoles.id)
});

export type SelectUserRoleAssignment = typeof userRoleAssignments.$inferSelect;

// Function to get menu items for a user based on their role
export async function getMenuItemsForUser(
  userEmail: string
): Promise<SelectMenuItem[]> {
  // Get user's role assignments
  const userRoleAssignment = await db
    .select()
    .from(userRoleAssignments)
    .where(eq(userRoleAssignments.userEmail, userEmail))
    .limit(1);

  if (userRoleAssignment.length === 0) {
    return [];
  }

  const roleId = userRoleAssignment[0].roleId;

  // Get menu item IDs for this role
  const permissions = await db
    .select()
    .from(roleMenuPermissions)
    .where(eq(roleMenuPermissions.roleId, roleId));

  if (permissions.length === 0) {
    return [];
  }

  const menuItemIds = permissions.map((p) => p.menuItemId);

  // Get the actual menu items
  const items = await db
    .select()
    .from(menuItems)
    .where(inArray(menuItems.id, menuItemIds))
    .orderBy(asc(menuItems.order));

  return items.filter((item) => item.isActive);
}

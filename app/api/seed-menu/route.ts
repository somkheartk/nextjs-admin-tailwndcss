import {
  db,
  userRoles,
  menuItems,
  roleMenuPermissions,
  userRoleAssignments
} from '@/lib/db';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if data already exists
    const existingRoles = await db.execute(
      sql`SELECT COUNT(*) as count FROM user_roles`
    );
    const rolesCount = (existingRoles.rows[0] as any)?.count || 0;

    if (rolesCount > 0) {
      return Response.json({
        message:
          'Menu and permission data already exists. Database is already initialized.',
        status: 'already_initialized'
      });
    }

    // Insert roles
    await db.insert(userRoles).values([
      { id: 1, name: 'admin', description: 'Full access to all features' },
      { id: 2, name: 'manager', description: 'Access to most features' },
      { id: 3, name: 'user', description: 'Limited access' }
    ]);

    // Insert menu items
    await db.insert(menuItems).values([
      {
        id: 1,
        label: 'Dashboard',
        href: '/',
        icon: 'Home',
        order: 1,
        isActive: true
      },
      {
        id: 2,
        label: 'Orders',
        href: '/orders',
        icon: 'ShoppingCart',
        order: 2,
        isActive: true
      },
      {
        id: 3,
        label: 'Products',
        href: '/',
        icon: 'Package',
        order: 3,
        isActive: true
      },
      {
        id: 4,
        label: 'Customers',
        href: '/customers',
        icon: 'Users2',
        order: 4,
        isActive: true
      },
      {
        id: 5,
        label: 'Analytics',
        href: '/analytics',
        icon: 'LineChart',
        order: 5,
        isActive: true
      }
    ]);

    // Insert role-menu permissions
    // Admin has access to all menus
    await db.insert(roleMenuPermissions).values([
      { roleId: 1, menuItemId: 1 },
      { roleId: 1, menuItemId: 2 },
      { roleId: 1, menuItemId: 3 },
      { roleId: 1, menuItemId: 4 },
      { roleId: 1, menuItemId: 5 }
    ]);

    // Manager has access to Dashboard, Products, Customers
    await db.insert(roleMenuPermissions).values([
      { roleId: 2, menuItemId: 1 },
      { roleId: 2, menuItemId: 3 },
      { roleId: 2, menuItemId: 4 }
    ]);

    // User has access to Dashboard and Products only
    await db.insert(roleMenuPermissions).values([
      { roleId: 3, menuItemId: 1 },
      { roleId: 3, menuItemId: 3 }
    ]);

    // Example: Assign a user to a role (replace with actual user email after authentication)
    // await db.insert(userRoleAssignments).values([
    //   { userEmail: 'your-github-email@example.com', roleId: 1 }
    // ]);

    return Response.json({
      message:
        'Menu and permission data seeded successfully! Users will be automatically assigned the "user" role on first login.',
      status: 'success'
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}

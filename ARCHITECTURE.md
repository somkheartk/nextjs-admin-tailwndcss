# Architecture Overview: Dynamic Menu System

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Login Flow                         │
└─────────────────────────────────────────────────────────────────┘

User clicks "Sign in with GitHub"
        ↓
GitHub OAuth Authentication
        ↓
NextAuth Session Callback (lib/auth.ts)
        ↓
Query user_role_assignments table by email
        ↓
Add roleId to session object
        ↓
Redirect to Dashboard


┌─────────────────────────────────────────────────────────────────┐
│                      Menu Rendering Flow                        │
└─────────────────────────────────────────────────────────────────┘

Dashboard Layout loads (app/(dashboard)/layout.tsx)
        ↓
Get session with auth()
        ↓
Extract user email from session
        ↓
Call getMenuItemsForUser(email) from lib/db.ts
        ↓
┌──────────────────────────────────────────────────┐
│  Database Queries:                               │
│  1. Get user's role from user_role_assignments   │
│  2. Get permitted menu IDs from                  │
│     role_menu_permissions                        │
│  3. Get menu details from menu_items             │
│  4. Filter active items & sort by order          │
└──────────────────────────────────────────────────┘
        ↓
Return filtered menu items array
        ↓
Pass to DesktopNav and MobileNav components
        ↓
Render dynamic menu with Lucide icons


┌─────────────────────────────────────────────────────────────────┐
│                     Database Schema                             │
└─────────────────────────────────────────────────────────────────┘

┌────────────────┐         ┌─────────────────────┐
│  user_roles    │         │   menu_items        │
├────────────────┤         ├─────────────────────┤
│ id (PK)        │         │ id (PK)             │
│ name           │         │ label               │
│ description    │         │ href                │
└────────────────┘         │ icon                │
        ↑                  │ order               │
        │                  │ is_active           │
        │                  └─────────────────────┘
        │                          ↑
        │                          │
┌───────┴────────────────┐    ┌────┴──────────────────┐
│ user_role_assignments  │    │ role_menu_permissions │
├────────────────────────┤    ├───────────────────────┤
│ id (PK)                │    │ id (PK)               │
│ user_email             │    │ role_id (FK)          │
│ role_id (FK)           │    │ menu_item_id (FK)     │
└────────────────────────┘    └───────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                      File Changes                               │
└─────────────────────────────────────────────────────────────────┘

Core Changes:
  • lib/db.ts                     - Added 4 tables + getMenuItemsForUser()
  • lib/auth.ts                   - Session callback to fetch roleId
  • app/(dashboard)/layout.tsx    - Dynamic menu rendering
  • types/next-auth.d.ts          - Extended NextAuth types

API Routes:
  • app/api/seed-menu/route.ts    - Initialize menu data
  • app/api/assign-role/route.ts  - Assign roles to users

Documentation:
  • MENU_SETUP.md                 - Setup instructions
  • IMPLEMENTATION_SUMMARY.md     - Technical details
  • database-migration.sql        - SQL migration script
  • README.md                     - Updated with features


┌─────────────────────────────────────────────────────────────────┐
│                    Security Features                            │
└─────────────────────────────────────────────────────────────────┘

✓ Server-side menu filtering
✓ Role-based access control
✓ Database-driven permissions
✓ No client-side permission exposure
✓ Type-safe implementation with TypeScript
✓ Uses existing NextAuth session security


┌─────────────────────────────────────────────────────────────────┐
│                    Default Configuration                        │
└─────────────────────────────────────────────────────────────────┘

Roles:
  1. Admin    → Full access to all 5 menus
  2. Manager  → Access to 3 menus (Dashboard, Products, Customers)
  3. User     → Access to 2 menus (Dashboard, Products)

Menu Items:
  1. Dashboard  (icon: Home)         - href: #
  2. Orders     (icon: ShoppingCart) - href: #
  3. Products   (icon: Package)      - href: /
  4. Customers  (icon: Users2)       - href: /customers
  5. Analytics  (icon: LineChart)    - href: #
```

## Benefits of This Implementation

1. **Flexibility**: No code changes needed to modify menus
2. **Scalability**: Easy to add roles and permissions
3. **Security**: Server-side filtering prevents unauthorized access
4. **Maintainability**: Clear separation of concerns
5. **User Experience**: Personalized navigation
6. **Type Safety**: Full TypeScript support
7. **Minimal Changes**: Surgical modifications to existing code

## Quick Start

```bash
# 1. Run database migration
psql $POSTGRES_URL -f database-migration.sql

# 2. Assign your role (replace email and roleId)
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "you@example.com", "roleId": 1}'

# 3. Login and enjoy personalized menus!
```

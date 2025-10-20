<div align="center"><strong>Next.js 15 Admin Dashboard Template</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://next-admin-dash.vercel.app/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Overview

This is a starter template using the following stack:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Auth.js](https://authjs.dev)
- Database - [Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

## Features

- **Dynamic Menu System**: Menu items are loaded from the database and filtered based on user roles and permissions
- **Role-Based Access Control**: Users can be assigned different roles (admin, manager, user) with different menu access
- **Secure Server-Side Filtering**: Menu authorization happens on the server for better security

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

**The application now automatically creates tables and seeds initial data on first run!** You no longer need to manually run SQL scripts or seed endpoints.

### Environment Variables

Copy the `.env.example` file to `.env` and update the values. Follow the instructions in the `.env.example` file to set up your GitHub OAuth application.

```bash
npm i -g vercel
vercel link
vercel env pull
```

Finally, run the following commands to start the development server:

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.

### What Happens Automatically

When you first run the application:

1. **Database tables are created automatically** - The system checks if required tables exist and creates them if needed
2. **Initial data is seeded automatically** - Default roles (admin, manager, user) and menu items are populated
3. **Users are auto-assigned a role** - New users are automatically assigned the "user" role on first login
4. **No manual setup required** - Just configure your database connection and OAuth, then run!

### Optional: Manual Role Assignment

If you want to give yourself admin access instead of the default user role:

```bash
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "your-github-email@example.com", "roleId": 1}'
```

### Legacy Setup (No Longer Required)

The following steps are **no longer necessary** but are kept for reference:

<details>
<summary>Old manual setup instructions (click to expand)</summary>

Inside the Vercel Postgres dashboard, create a table based on the schema defined in this repository.

```
CREATE TYPE status AS ENUM ('active', 'inactive', 'archived');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  status status NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  available_at TIMESTAMP NOT NULL
);
```

Then, uncomment `app/api/seed.ts` and hit `http://localhost:3000/api/seed` to seed the database with products.

### Menu and Permissions Setup (Old Method)

The application now includes a dynamic menu system based on user roles. To set it up manually:

1. Run the SQL migration script `database-migration.sql` in your database, or
2. Visit `http://localhost:3000/api/seed-menu` to initialize the menu system

Then assign your GitHub user email to a role:
```bash
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "your-github-email@example.com", "roleId": 1}'
```

For detailed setup instructions, see [MENU_SETUP.md](MENU_SETUP.md).

</details>

<div align="center">
  <h1>🚀 Next.js 15 Admin Dashboard Template</h1>
  <p>A modern, production-ready admin dashboard built with Next.js App Router</p>
  <p>
    <a href="https://next-admin-dash.vercel.app/">
      <img src="https://img.shields.io/badge/demo-live-brightgreen" alt="Live Demo" />
    </a>
    <a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">
      <img src="https://img.shields.io/badge/deploy-vercel-black" alt="Deploy with Vercel" />
    </a>
    <a href="LICENSE.md">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
    </a>
  </p>
  <p>
    <a href="https://next-admin-dash.vercel.app/">View Demo</a>
    ·
    <a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Deploy Now</a>
    ·
    <a href="#-features">Features</a>
    ·
    <a href="#-quick-start">Quick Start</a>
    ·
    <a href="#-documentation">Documentation</a>
  </p>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
  - [Option 1: Mock Data Mode (No Database)](#option-1-mock-data-mode-no-database-required)
  - [Option 2: Full Setup with Database](#option-2-full-setup-with-database)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Authentication Setup](#-authentication-setup)
- [Database Setup](#-database-setup)
- [Role Management](#-role-management)
- [Troubleshooting](#-troubleshooting)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This is a **production-ready admin dashboard template** built with the latest Next.js 15 App Router. It features a complete authentication system, role-based access control, dynamic menu system, and can run with or without a database connection—perfect for both rapid prototyping and full production deployments.

### What Makes This Template Special?

✨ **Zero-Config Development** - Start coding immediately with mock data mode, no database setup required  
🔐 **Enterprise-Ready Security** - Built-in authentication with GitHub OAuth and role-based permissions  
🎨 **Beautiful UI** - Modern, responsive design using Tailwind CSS and Shadcn UI components  
🚀 **Automatic Setup** - Database tables and seed data are created automatically on first run  
🌍 **Internationalization** - Built-in support for multiple languages (English & Thai)  
📱 **Responsive** - Works flawlessly on desktop, tablet, and mobile devices

---

## ✨ Features

### 🎨 User Interface
- **Modern Dashboard** - Clean, intuitive admin interface with responsive design
- **Dynamic Navigation** - Menu items automatically adjust based on user permissions
- **Dark Mode Ready** - UI components designed for easy dark mode implementation
- **Mobile Optimized** - Fully responsive layout that works on all devices
- **Component Library** - Pre-built components using Shadcn UI

### 🔐 Authentication & Security
- **GitHub OAuth** - Secure authentication using GitHub accounts
- **Role-Based Access Control (RBAC)** - Three built-in roles: Admin, Manager, and User
- **Server-Side Security** - All permission checks happen on the server
- **Session Management** - Secure session handling with NextAuth.js
- **Protected Routes** - Automatic authentication checks for protected pages

### 📊 Data Management
- **Product Management** - Full CRUD operations for products
- **Order Tracking** - Complete order management system
- **Customer Database** - Customer information management
- **Analytics Dashboard** - Data visualization and statistics
- **Search & Pagination** - Built-in search and pagination for all data tables

### 🛠️ Developer Features
- **Mock Data Mode** - Develop frontend without database setup
- **TypeScript** - Full type safety throughout the application
- **Automatic Migrations** - Database tables created automatically on first run
- **Hot Reload** - Fast refresh for rapid development
- **Code Formatting** - Prettier configuration included
- **Vercel Optimization** - Optimized for seamless Vercel deployment

### 🌐 Internationalization
- **Multi-Language Support** - Switch between English and Thai
- **Persistent Language Selection** - Language preference saved locally
- **Easy to Extend** - Simple translation system for adding more languages

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | [Next.js 15](https://nextjs.org) | React framework with App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org) | Type-safe JavaScript |
| **Authentication** | [Auth.js](https://authjs.dev) | GitHub OAuth authentication |
| **Database** | [Postgres](https://vercel.com/postgres) | PostgreSQL database (optional) |
| **ORM** | [Drizzle](https://orm.drizzle.team) | Type-safe database queries |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS framework |
| **Components** | [Shadcn UI](https://ui.shadcn.com/) | Re-usable component library |
| **Icons** | [Lucide React](https://lucide.dev) | Beautiful icon set |
| **Deployment** | [Vercel](https://vercel.com) | Cloud platform for deployment |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) | Web analytics |
| **Formatting** | [Prettier](https://prettier.io) | Code formatter |

---

## 🚀 Quick Start

Get up and running in minutes! Choose the option that best fits your needs:

---

## 🚀 Quick Start

Get up and running in minutes! Choose the option that best fits your needs:

### Option 1: Mock Data Mode (No Database Required)

**Perfect for**: Frontend development, UI prototyping, learning the codebase

This mode lets you start developing immediately without any database setup. The application uses mock data for all features.

#### Steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/somkheartk/nextjs-admin-tailwndcss.git
   cd nextjs-admin-tailwndcss
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure minimal settings** (edit `.env`)
   ```env
   # Leave POSTGRES_URL commented out for mock data mode
   # POSTGRES_URL=
   
   NEXTAUTH_URL=http://localhost:3000
   AUTH_SECRET=your-secret-here  # Generate at https://generate-secret.vercel.app/32
   
   # Optional: Add GitHub OAuth for authentication
   AUTH_GITHUB_ID=your-github-id
   AUTH_GITHUB_SECRET=your-github-secret
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

   🎉 **That's it!** The app is now running with mock data including:
   - 12 sample products with images and prices
   - Sample orders and customers
   - All menu items and navigation
   - Full pagination and search functionality

### Option 2: Full Setup with Database

**Perfect for**: Production deployment, testing real data, full-featured development

This mode provides complete functionality with persistent data storage.

### Option 2: Full Setup with Database

**Perfect for**: Production deployment, testing real data, full-featured development

This mode provides complete functionality with persistent data storage.

#### Prerequisites:
- Node.js 18+ installed
- A PostgreSQL database (we recommend [Vercel Postgres](https://vercel.com/postgres))
- A GitHub OAuth App (for authentication)

#### Steps:

1. **Clone and install** (if you haven't already)
   ```bash
   git clone https://github.com/somkheartk/nextjs-admin-tailwndcss.git
   cd nextjs-admin-tailwndcss
   npm install
   ```

2. **Set up PostgreSQL database**
   
   Option A - Using Vercel Postgres (Recommended):
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Link your project
   vercel link
   
   # Pull environment variables (includes POSTGRES_URL)
   vercel env pull
   ```
   
   Option B - Using your own PostgreSQL:
   - Get your PostgreSQL connection string
   - Format: `postgres://user:password@host:port/database`

3. **Configure environment variables**
   
   Create `.env` file with:
   ```env
   # Your PostgreSQL connection string
   POSTGRES_URL=postgres://user:password@host:port/database
   
   NEXTAUTH_URL=http://localhost:3000
   AUTH_SECRET=your-secret-here  # Generate at https://generate-secret.vercel.app/32
   
   # GitHub OAuth credentials (see Authentication Setup section)
   AUTH_GITHUB_ID=your-github-client-id
   AUTH_GITHUB_SECRET=your-github-client-secret
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Automatic database initialization** ✨
   
   On first run, the application will automatically:
   - Create all required database tables
   - Seed default roles (Admin, Manager, User)
   - Populate menu items and permissions
   - You don't need to run any SQL scripts manually!

6. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) and sign in with GitHub

7. **Assign yourself an admin role** (optional)
   
   By default, new users get the "User" role. To become an admin:
   ```bash
   curl -X POST http://localhost:3000/api/assign-role \
     -H "Content-Type: application/json" \
     -d '{"userEmail": "your-github-email@example.com", "roleId": 1}'
   ```
   
   Role IDs: 1 = Admin, 2 = Manager, 3 = User

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy your Next.js app is with Vercel:

#### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/somkheartk/nextjs-admin-tailwndcss)

1. Click the "Deploy" button above
2. Vercel will clone the repository and create a new project
3. Add a Postgres database when prompted
4. Add these environment variables:
   - `AUTH_GITHUB_ID` - Your GitHub OAuth App Client ID
   - `AUTH_GITHUB_SECRET` - Your GitHub OAuth App Client Secret
   - `AUTH_SECRET` - Generate at [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
5. Click "Deploy"

#### Option B: Deploy from CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set up environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Important Notes:

✅ **Database tables are created automatically** - No manual SQL execution needed  
✅ **Seed data is added on first request** - Roles and menus are initialized automatically  
✅ **Build-time safe** - Database operations only happen at runtime, not during build  
✅ **Zero downtime** - Database initialization happens seamlessly on first access  

### Other Deployment Platforms

This application can be deployed to any platform that supports Next.js:
- **Netlify** - See [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- **Railway** - See [Deploy Next.js on Railway](https://docs.railway.app/guides/nextjs)
- **AWS** - Use [AWS Amplify](https://aws.amazon.com/amplify/) or [Serverless Next.js](https://serverless-nextjs.com/)
- **Docker** - Build a Docker image using the included `next.config.ts`

---

## 📁 Project Structure

```
nextjs-admin-tailwndcss/
├── app/                        # Next.js App Router
│   ├── (dashboard)/           # Dashboard layout group
│   │   ├── layout.tsx         # Dashboard layout with navigation
│   │   ├── page.tsx           # Products page (main dashboard)
│   │   ├── orders/            # Orders management
│   │   ├── customers/         # Customer management
│   │   ├── analytics/         # Analytics dashboard
│   │   └── settings/          # Role management settings
│   ├── api/                   # API routes
│   │   ├── seed-menu/         # Menu initialization endpoint
│   │   └── assign-role/       # Role assignment endpoint
│   ├── login/                 # Login page
│   └── layout.tsx             # Root layout
├── components/                 # Reusable components
│   ├── ui/                    # Shadcn UI components
│   ├── language-switcher.tsx  # Language selection
│   ├── product-form.tsx       # Product form dialog
│   └── customer-form.tsx      # Customer form dialog
├── lib/                       # Utility functions
│   ├── db.ts                  # Database queries and schema
│   ├── auth.ts                # Authentication configuration
│   ├── mock-data.ts           # Mock data for development
│   └── i18n/                  # Internationalization
│       ├── translations.ts    # Translation strings
│       └── language-context.tsx # Language context provider
├── types/                     # TypeScript type definitions
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── database-migration.sql    # SQL migration script (optional)
├── middleware.ts             # Next.js middleware for auth
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # This file
├── ARCHITECTURE.md           # System architecture documentation
├── FEATURES_IMPLEMENTED.md   # Detailed feature list
└── MENU_SETUP.md            # Menu system setup guide
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory. Here's what each variable does:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `POSTGRES_URL` | No* | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `NEXTAUTH_URL` | Yes | Your app's URL | `http://localhost:3000` |
| `AUTH_SECRET` | Yes | Secret for session encryption | Generate at [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) |
| `AUTH_GITHUB_ID` | Yes | GitHub OAuth App Client ID | `Iv1.abc123def456` |
| `AUTH_GITHUB_SECRET` | Yes | GitHub OAuth App Client Secret | `abc123def456...` |

\* If `POSTGRES_URL` is not set, the app runs in mock data mode

### Generating AUTH_SECRET

```bash
# Option 1: Use online generator
# Visit: https://generate-secret.vercel.app/32

# Option 2: Use OpenSSL
openssl rand -base64 32

# Option 3: Use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🔐 Authentication Setup

This application uses GitHub OAuth for authentication. Follow these steps to set it up:

### 1. Create a GitHub OAuth App

1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Your app name (e.g., "My Admin Dashboard")
   - **Homepage URL**: `http://localhost:3000` (for local development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"

### 2. Get Your Credentials

After creating the app, you'll see:
- **Client ID** - Copy this to `AUTH_GITHUB_ID`
- **Client Secret** - Click "Generate a new client secret" and copy it to `AUTH_GITHUB_SECRET`

### 3. Update Environment Variables

Add to your `.env` file:
```env
AUTH_GITHUB_ID=your_client_id_here
AUTH_GITHUB_SECRET=your_client_secret_here
```

### 4. Production Setup

When deploying to production:
1. Create another OAuth App (or update the existing one)
2. Set **Homepage URL** to your production URL (e.g., `https://yourdomain.com`)
3. Set **Authorization callback URL** to `https://yourdomain.com/api/auth/callback/github`
4. Update environment variables in your deployment platform

### Testing Authentication

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Sign in with GitHub"
4. Authorize the application
5. You should be redirected to the dashboard

---

## 🗄️ Database Setup

### Automatic Setup (Recommended)

The application automatically handles database setup! When you first access any page that requires database:

1. ✅ Tables are created if they don't exist
2. ✅ Default roles are inserted (Admin, Manager, User)
3. ✅ Menu items are seeded with proper permissions
4. ✅ Everything happens seamlessly in the background

**You don't need to run any SQL scripts manually!**

### Manual Setup (Optional)

If you prefer to set up the database manually or need to reset it:

```bash
# Using psql
psql $POSTGRES_URL -f database-migration.sql

# Or using a database GUI tool
# Import the file: database-migration.sql
```

### Database Schema

The application uses these tables:

- **`products`** - Product catalog
- **`user_roles`** - Available roles (Admin, Manager, User)
- **`menu_items`** - Navigation menu items
- **`role_menu_permissions`** - Which roles can see which menus
- **`user_role_assignments`** - User role assignments

For detailed schema information, see [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 👥 Role Management

### Understanding Roles

The application has three built-in roles with different access levels:

| Role | Access Level | Menu Access |
|------|--------------|-------------|
| **Admin** | Full access | All 5 menus (Dashboard, Orders, Products, Customers, Analytics) |
| **Manager** | Limited admin | 3 menus (Dashboard, Products, Customers) |
| **User** | Basic access | 2 menus (Dashboard, Products) |

### Default Behavior

- 🎯 New users are automatically assigned the **User** role on first login
- 📋 Menu items are automatically filtered based on role
- 🔒 Server-side permission checking ensures security
- 🎨 Clean UI - users only see menus they have access to

### Assigning Roles

#### Option 1: Using the API

```bash
# Assign Admin role (roleId: 1)
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "user@example.com", "roleId": 1}'

# Assign Manager role (roleId: 2)
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "user@example.com", "roleId": 2}'

# Assign User role (roleId: 3)
curl -X POST http://localhost:3000/api/assign-role \
  -H "Content-Type: application/json" \
  -d '{"userEmail": "user@example.com", "roleId": 3}'
```

#### Option 2: Direct Database Update

```sql
-- Find user's current role
SELECT * FROM user_role_assignments WHERE user_email = 'user@example.com';

-- Update user role
UPDATE user_role_assignments 
SET role_id = 1 
WHERE user_email = 'user@example.com';

-- Or insert if doesn't exist
INSERT INTO user_role_assignments (user_email, role_id) 
VALUES ('user@example.com', 1)
ON CONFLICT (user_email) DO UPDATE SET role_id = 1;
```

### Viewing Roles

Navigate to the **Settings** page (`/settings`) to:
- View all users and their assigned roles
- See permission descriptions for each role
- Understand the role hierarchy

For more details, see [MENU_SETUP.md](MENU_SETUP.md)

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot connect to database" Error

**Problem**: Database connection fails

**Solutions**:
- ✅ Check that `POSTGRES_URL` is correctly set in `.env`
- ✅ Verify your database is running and accessible
- ✅ Test connection string format: `postgres://user:password@host:port/database`
- ✅ Try running without database (comment out `POSTGRES_URL`) to use mock data

```bash
# Test database connection
psql $POSTGRES_URL -c "SELECT 1;"
```

#### 2. GitHub OAuth Not Working

**Problem**: "OAuth error" or can't sign in

**Solutions**:
- ✅ Verify `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` are correct
- ✅ Check callback URL matches in GitHub OAuth settings
  - Local: `http://localhost:3000/api/auth/callback/github`
  - Production: `https://yourdomain.com/api/auth/callback/github`
- ✅ Ensure `AUTH_SECRET` is set (generate at [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32))
- ✅ Clear browser cookies and try again

#### 3. Tables Not Created Automatically

**Problem**: Database tables don't exist after first run

**Solutions**:
- ✅ Access any protected route (like `/`) to trigger initialization
- ✅ Check database permissions - user must have CREATE TABLE rights
- ✅ Manually run migration: `psql $POSTGRES_URL -f database-migration.sql`
- ✅ Check server logs for any error messages

#### 4. Build Errors

**Problem**: `npm run build` fails

**Solutions**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Build again
npm run build
```

#### 5. Menu Items Not Showing

**Problem**: User doesn't see any menu items

**Solutions**:
- ✅ Check user has a role assigned in database
- ✅ Verify role has menu permissions in `role_menu_permissions` table
- ✅ Sign out and sign in again to refresh session
- ✅ Check server logs for permission errors

```bash
# Check user's role
curl http://localhost:3000/api/assign-role?email=user@example.com
```

#### 6. Port Already in Use

**Problem**: "Port 3000 already in use"

**Solutions**:
```bash
# Option 1: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
PORT=3001 npm run dev
```

#### 7. TypeScript Errors

**Problem**: Type errors during development

**Solutions**:
```bash
# Regenerate types
npx drizzle-kit generate:pg

# Restart TypeScript server in your editor
# VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Still Having Issues?

1. 📖 Check [existing issues](https://github.com/somkheartk/nextjs-admin-tailwndcss/issues) on GitHub
2. 💬 Create a [new issue](https://github.com/somkheartk/nextjs-admin-tailwndcss/issues/new) with:
   - Detailed description of the problem
   - Steps to reproduce
   - Error messages or screenshots
   - Your environment (OS, Node version, etc.)

---

## 📚 Documentation

Additional documentation is available in the repository:

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture and data flow diagrams |
| [FEATURES_IMPLEMENTED.md](FEATURES_IMPLEMENTED.md) | Complete list of implemented features |
| [MENU_SETUP.md](MENU_SETUP.md) | Detailed menu system configuration guide |
| [DEPLOYMENT_FIX.md](DEPLOYMENT_FIX.md) | Deployment troubleshooting guide |
| [BEFORE_AFTER.md](BEFORE_AFTER.md) | Comparison of features before and after updates |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs by creating [issues](https://github.com/somkheartk/nextjs-admin-tailwndcss/issues)
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🔧 Submit pull requests with bug fixes or features
- ⭐ Star the repository if you find it useful

### Development Workflow

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nextjs-admin-tailwndcss.git
   cd nextjs-admin-tailwndcss
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**
   ```bash
   npm run build
   npm run dev
   # Test thoroughly in browser
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   # or
   git commit -m "fix: describe the bug fix"
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request"
   - Describe your changes clearly
   - Wait for review

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing naming conventions
- Use functional components with hooks
- Keep components small and focused
- Add proper TypeScript types
- Format code with Prettier: `npm run format` (if available)

### Commit Message Convention

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: format code, no functional changes
refactor: refactor code
test: add or update tests
chore: update build process, dependencies, etc.
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

### What this means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ License and copyright notice required

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [Next.js](https://nextjs.org) - The React Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful components
- [Auth.js](https://authjs.dev) - Authentication library
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM
- [Lucide](https://lucide.dev) - Icon library

---

## 🔗 Links

- 🌐 **Live Demo**: [https://next-admin-dash.vercel.app/](https://next-admin-dash.vercel.app/)
- 📦 **GitHub Repository**: [https://github.com/somkheartk/nextjs-admin-tailwndcss](https://github.com/somkheartk/nextjs-admin-tailwndcss)
- 🚀 **Deploy Template**: [Vercel Template](https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs)
- 📖 **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- 💬 **Issues & Support**: [GitHub Issues](https://github.com/somkheartk/nextjs-admin-tailwndcss/issues)

---

<div align="center">
  <p>Made with ❤️ using Next.js 15</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>

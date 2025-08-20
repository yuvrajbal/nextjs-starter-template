# 🚀 Next.js Starter Template

A modern, production-ready Next.js starter template with authentication, theming, database integration, and beautiful UI components.

![Next.js](https://img.shields.io/badge/Next.js-15.4.7-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)
![Prisma](https://img.shields.io/badge/Prisma-6.14.0-2D3748)

## ✨ Features

- 🔐 **Authentication** - NextAuth.js v5 with Google OAuth and magic link support
- 🎨 **UI Components** - shadcn/ui components with dark/light theme toggle
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🗄️ **Database Ready** - PostgreSQL with Prisma ORM and type-safe queries
- 👥 **User Management** - Complete user profiles and account management
- 🚀 **Performance** - Built with Next.js 15 and Turbopack for fast development
- 📧 **Email Integration** - Resend for transactional emails
- 🔒 **Middleware Protection** - Route protection and authentication guards
- 📝 **Form Validation** - Zod for runtime type validation
- 🎭 **State Management** - Zustand for client-side state
- 🔧 **Developer Experience** - TypeScript, ESLint, and hot reload

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible components
- **Lucide React** - Beautiful icon library

### Backend & Database
- **NextAuth.js v5** - Authentication library
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Robust relational database
- **Zod** - Schema validation

### Developer Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun
- PostgreSQL database

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd nextjs-template
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your-database-name"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Resend Email (optional)
AUTH_RESEND_KEY="your-resend-api-key"
EMAIL_FROM="your-email@yourdomain.com"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | ✅ |
| `NEXTAUTH_URL` | Base URL of your application | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ❌ |
| `AUTH_RESEND_KEY` | Resend API key for emails | ❌ |
| `EMAIL_FROM` | From email address | ❌ |

## 🗄️ Database Setup

### Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a new database:
   ```sql
   CREATE DATABASE your_database_name;
   ```
3. Update `DATABASE_URL` in your `.env.local` file

### Cloud Providers

#### Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy the connection string and add it to `DATABASE_URL`

#### Neon
1. Create a new project at [neon.tech](https://neon.tech)
2. Copy the connection string from your dashboard
3. Add it to `DATABASE_URL`

#### Railway
1. Create a new PostgreSQL service at [railway.app](https://railway.app)
2. Copy the connection string from the service variables
3. Add it to `DATABASE_URL`

## 🔐 Authentication Setup

### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to your `.env.local`

### Magic Link with Resend (Optional)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add your API key to `AUTH_RESEND_KEY` in `.env.local`
4. Set your from email address in `EMAIL_FROM`

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── prisma/              # Database schema and migrations
├── stores/              # Zustand stores
├── types/               # TypeScript type definitions
├── auth.ts              # NextAuth.js configuration
└── middleware.ts        # Route protection middleware
```

## 🎨 UI Components

This template includes a complete set of UI components from shadcn/ui:

- 🔘 Buttons, Inputs, Labels
- 📋 Cards, Dialogs, Dropdowns
- 🎭 Avatar, Navigation, Theme Toggle
- 📊 Charts, Tables, Forms
- 🔔 Toasts, Alerts, Loading States

All components are:
- ✅ Fully accessible (ARIA compliant)
- 🎨 Customizable with CSS variables
- 📱 Responsive and mobile-friendly
- 🌙 Dark/light theme compatible

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

This template works with any platform that supports Node.js:

- **Netlify** - Add `npm run build` as build command
- **Railway** - Automatic deployments from Git
- **DigitalOcean App Platform** - Container-based deployments
- **AWS Amplify** - Serverless deployments

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma migrate   # Create and run migrations
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com) - Beautifully designed components
- [NextAuth.js](https://next-auth.js.org) - Authentication for Next.js
- [Prisma](https://prisma.io) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

Made with ❤️ by [Yuvraj](https://github.com/yuvrajbal)

## 💡 What's Next?

- [ ] Add more authentication providers (GitHub, Twitter, etc.)
- [ ] Implement role-based access control (RBAC)
- [ ] Add API rate limiting
- [ ] Integrate payment processing (Stripe)
- [ ] Add comprehensive testing suite
- [ ] Implement real-time features with WebSockets
- [ ] Add internationalization (i18n) support
- [ ] Create admin dashboard
- [ ] Add analytics integration
- [ ] Implement file upload functionality

## 📞 Support

If you have any questions or need help getting started:

1. Check the [documentation](https://nextjs.org/docs)
2. Open an [issue](https://github.com/your-repo/issues)
3. Join our [Discord community](https://discord.gg/your-server)

Happy coding! 🎉
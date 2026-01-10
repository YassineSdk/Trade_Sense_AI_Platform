# TradeSense AI Platform - Frontend

> Modern Next.js 14 application with TypeScript, Tailwind CSS, and real-time trading features

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Styling Guidelines](#styling-guidelines)
- [Component Development](#component-development)
- [State Management](#state-management)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)

---

## 🎯 Overview

The TradeSense AI Platform frontend is a modern, responsive web application built with Next.js 14, providing traders with an intuitive interface for prop trading challenges, real-time market data, AI-powered signals, and comprehensive analytics.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional interface with Tailwind CSS
- ⚡ **Next.js 14** - Latest features including App Router and Server Components
- 📱 **Fully Responsive** - Mobile-first design approach
- 🔒 **Authentication** - Secure JWT-based authentication with refresh tokens
- 📊 **Real-time Data** - WebSocket integration for live market data
- 📈 **Advanced Charts** - TradingView Lightweight Charts integration
- 🎯 **Type Safety** - Full TypeScript support
- 🌙 **Dark Mode Ready** - Theme switching capability
- ♿ **Accessible** - WCAG 2.1 compliant
- 🚀 **Optimized Performance** - Code splitting, lazy loading, and caching

## 🛠 Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety and enhanced DX

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefix automation

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **Socket.io Client** - Real-time WebSocket communication

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Charts & Visualization
- **Lightweight Charts** - TradingView charting library
- **Recharts** - React chart components

### UI Components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **Radix UI** (planned) - Headless UI primitives

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm 9+** or **yarn 1.22+** or **pnpm 8+**
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/tradesense-ai-platform.git
cd tradesense-ai-platform/frontend
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Set Up Environment Variables

```bash
# Copy example environment file
cp .env.local.example .env.local

# Edit .env.local with your configuration
nano .env.local  # or use your preferred editor
```

### 4. Verify Backend Connection

Ensure the backend API is running on `http://localhost:5000` (or update `NEXT_PUBLIC_API_URL` in `.env.local`)

---

## 💻 Development

### Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Development Features

- **Hot Reload** - Automatic refresh on file changes
- **Fast Refresh** - Preserves component state during updates
- **Error Overlay** - Detailed error messages in development
- **TypeScript Support** - Real-time type checking

---

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── auth/                    # Authentication pages
│   ├── dashboard/               # Dashboard pages
│   ├── challenges/              # Challenge pages
│   └── trades/                  # Trading pages
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── forms/                   # Form components
│   ├── charts/                  # Chart components
│   └── layout/                  # Layout components
├── lib/                         # Utility libraries
│   ├── api-client.ts           # API client configuration
│   ├── utils.ts                # Utility functions
│   └── hooks/                   # Custom React hooks
├── types/                       # TypeScript type definitions
│   ├── api.ts                  # API types
│   ├── models.ts               # Data model types
│   └── components.ts           # Component prop types
├── styles/                      # Global styles
│   └── globals.css             # Global CSS with Tailwind
├── public/                      # Static assets
│   ├── images/                 # Images
│   └── icons/                  # Icons
├── utils/                       # Helper functions
│   ├── formatters.ts           # Data formatters
│   ├── validators.ts           # Validation utilities
│   └── constants.ts            # Constants
├── .env.local.example          # Environment variables template
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

---

## 🔧 Environment Variables

### Required Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000
```

### Optional Variables

```env
NEXT_PUBLIC_APP_NAME=TradeSense AI Platform
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_SENTRY_DSN=https://...
```

See `.env.local.example` for complete list.

---

## 🔌 API Integration

### API Client Usage

```typescript
import { authApi, userApi, tradeApi } from '@/lib/api-client';

// Authentication
const response = await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});

// Fetch user profile
const profile = await userApi.getProfile();

// Create trade
const trade = await tradeApi.create({
  symbol: 'AAPL',
  side: 'buy',
  quantity: 100,
  type: 'market'
});
```

### Error Handling

```typescript
import { handleApiError } from '@/lib/api-client';

try {
  const response = await authApi.login(credentials);
  // Handle success
} catch (error) {
  const message = handleApiError(error);
  console.error(message);
}
```

---

## 🎨 Styling Guidelines

### Tailwind CSS Classes

```tsx
// Button Example
<button className="btn btn-primary">
  Click Me
</button>

// Card Example
<div className="card card-hover">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

// Input Example
<input className="input" type="text" />
```

### Custom Utilities

Available custom utility classes:
- `.btn`, `.btn-primary`, `.btn-secondary`
- `.card`, `.card-hover`
- `.input`, `.input-error`
- `.badge`, `.badge-success`, `.badge-danger`
- `.spinner` - Loading spinner
- `.price-up`, `.price-down` - Price indicators

### Color Palette

- **Primary**: Blue (`primary-*`)
- **Secondary**: Purple (`secondary-*`)
- **Success**: Green (`success-*`)
- **Danger**: Red (`danger-*`)
- **Warning**: Yellow (`warning-*`)
- **Trading**: Green for long, Red for short

---

## 🧩 Component Development

### Component Template

```tsx
// components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'lg' && 'px-6 py-3 text-lg',
        loading && 'opacity-50 cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="spinner" /> : children}
    </button>
  );
}
```

---

## 🗃 State Management

### Zustand Store Example

```typescript
// stores/authStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

### Usage in Components

```tsx
import { useAuthStore } from '@/stores/authStore';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 🧪 Testing

### Unit Tests

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies primary variant class', () => {
    render(<Button variant="primary">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveClass('btn-primary');
  });
});
```

---

## 🏗 Building for Production

### Create Production Build

```bash
npm run build
```

### Test Production Build Locally

```bash
npm run start
```

### Build Output

- Static files in `.next/` directory
- Optimized JavaScript bundles
- Compressed CSS files
- Optimized images

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms

- **Netlify**: Connect Git repository
- **AWS Amplify**: Deploy via CLI or console
- **DigitalOcean App Platform**: Connect repository
- **Self-hosted**: Use `npm run build && npm start`

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 💬 Support

- 📧 Email: support@tradesense.ai
- 📖 Documentation: https://docs.tradesense.ai
- 💬 Discord: https://discord.gg/tradesense

---

**Built with ❤️ by the TradeSense Team**
# TradeSense AI Platform - React Frontend

Modern React frontend application for the TradeSense AI Platform, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Charts and data visualization
- **Sonner** - Toast notifications
- **Vitest** - Unit testing

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Backend API running on http://localhost:5000

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=TradeSense AI
VITE_APP_VERSION=1.0.0

# Environment
VITE_ENV=development
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # Reusable React components
│   │   ├── layouts/         # Layout components
│   │   ├── common/          # Common UI components
│   │   └── features/        # Feature-specific components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/            # API services
│   │   └── api.ts           # Axios client and API calls
│   ├── store/               # Zustand state stores
│   │   └── authStore.ts     # Authentication state
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Public static files
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS for styling with a custom design system:

**Color Palette:**
- Primary: Blue shades
- Secondary: Purple shades
- Success: Green shades
- Danger: Red shades
- Warning: Yellow shades
- Dark: Gray shades

**Custom Components:**
- `.btn` - Base button styles
- `.btn-primary`, `.btn-secondary`, etc. - Button variants
- `.input` - Form input styles
- `.card` - Card container styles
- `.badge` - Badge styles
- `.spinner` - Loading spinner

**Usage Example:**
```tsx
<button className="btn-primary">
  Click me
</button>

<input type="text" className="input" placeholder="Enter text" />

<div className="card">
  Card content here
</div>
```

## 🔐 Authentication

### Auth Store (Zustand)

The application uses Zustand for authentication state management:

```tsx
import { useAuthStore } from '@store/authStore'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore()

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.firstName}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  )
}
```

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## 🌐 API Integration

### API Client

The application uses Axios with interceptors for API calls:

```tsx
import { authApi, userApi, handleApiError } from '@services/api'

// Login example
try {
  const response = await authApi.login({
    email: 'user@example.com',
    password: 'password123'
  })
  
  if (response.success) {
    // Handle success
  }
} catch (error) {
  const errorMessage = handleApiError(error)
  toast.error(errorMessage)
}
```

### Available API Services

- **authApi** - Authentication endpoints
  - `register()`, `login()`, `logout()`, `refreshToken()`
  - `forgotPassword()`, `resetPassword()`, `verifyEmail()`

- **userApi** - User management
  - `getProfile()`, `updateProfile()`, `changePassword()`, `deleteAccount()`

- **tradingAccountApi** - Trading accounts (placeholder)
- **tradeApi** - Trade management (placeholder)
- **challengeApi** - Challenge enrollment (placeholder)
- **leaderboardApi** - Leaderboard data (placeholder)

### API Response Format

```typescript
interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  errors?: Record<string, string[]>
}
```

## 🧪 Testing

### Run Tests

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types

# Testing
npm test                 # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
```

## 🎯 Features

### Current Features

- ✅ Landing page with pricing and features
- ✅ User authentication (login/register)
- ✅ Protected routes and navigation
- ✅ Responsive design (mobile-first)
- ✅ Toast notifications
- ✅ Form validation with Zod
- ✅ API client with auto token refresh
- ✅ State management with Zustand
- ✅ Dark mode ready (styles included)

### Upcoming Features (Future Milestones)

- ⏳ User dashboard with portfolio overview
- ⏳ Trading account management
- ⏳ Trade execution interface
- ⏳ Real-time chart integration (TradingView)
- ⏳ Challenge enrollment and tracking
- ⏳ Leaderboard rankings
- ⏳ User profile and settings
- ⏳ Payment integration
- ⏳ Real-time WebSocket updates
- ⏳ AI trading signals display
- ⏳ Analytics and reporting

## 🔧 Configuration

### Vite Configuration

The `vite.config.ts` includes:
- React plugin
- Path aliases (@, @components, @pages, etc.)
- Proxy for API calls to backend
- Build optimizations with code splitting

### TypeScript Configuration

- Strict mode enabled
- Path mapping for clean imports
- ES2020 target
- React JSX support

### Tailwind Configuration

- Custom color palette
- Custom font families
- Extended spacing and animations
- Form and typography plugins

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **sm**: 640px (mobile)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large)

Example:
```tsx
<div className="px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl">
    Responsive Title
  </h1>
</div>
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=TradeSense AI
VITE_APP_VERSION=1.0.0
VITE_ENV=production
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Connection Issues

1. Check that backend is running on http://localhost:5000
2. Verify CORS is enabled on backend
3. Check `.env` file has correct `VITE_API_BASE_URL`
4. Check browser console for detailed errors

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### TypeScript Errors

```bash
# Run type check
npm run type-check

# Check specific file
npx tsc --noEmit src/path/to/file.tsx
```

## 📖 Best Practices

### Component Structure

```tsx
import { useState } from 'react'
import { MyComponentProps } from './types'

export default function MyComponent({ title, onSubmit }: MyComponentProps) {
  const [state, setState] = useState('')

  const handleClick = () => {
    // Logic here
  }

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}
```

### Custom Hooks

```tsx
import { useState, useEffect } from 'react'

export function useCustomHook() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Effect logic
  }, [])

  return { data }
}
```

### API Calls

```tsx
import { toast } from 'sonner'
import { authApi, handleApiError } from '@services/api'

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authApi.login({ email, password })
    
    if (response.success) {
      toast.success('Login successful!')
      // Handle success
    }
  } catch (error) {
    toast.error(handleApiError(error))
  }
}
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

Copyright © 2024 TradeSense AI. All rights reserved.

## 🆘 Support

For issues or questions:
- Check the troubleshooting section above
- Review backend API documentation
- Check browser console for errors
- Verify environment configuration

## 🔗 Links

- Backend API: http://localhost:5000
- Frontend: http://localhost:3000
- Documentation: See `/docs` folder in project root

---

**Status:** ✅ Milestone 1 Complete - Foundation setup ready for development
**Next:** Milestone 2 - Implement authentication endpoints and dashboard features
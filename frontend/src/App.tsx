import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'

// Pages
import HomePage from '@pages/HomePage'
import LoginPage from '@pages/LoginPage'
import RegisterPage from '@pages/RegisterPage'
import DashboardPage from '@pages/DashboardPage'
import NotFoundPage from '@pages/NotFoundPage'

// Layouts
import MainLayout from '@components/layouts/MainLayout'
import AuthLayout from '@components/layouts/AuthLayout'
import DashboardLayout from '@components/layouts/DashboardLayout'

// Hooks
import { useAuthStore } from '@store/authStore'

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/accounts" element={<div>Accounts Page</div>} />
            <Route path="/trades" element={<div>Trades Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            <Route path="/challenges" element={<div>Challenges Page</div>} />
            <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000}
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
          },
        }}
      />
    </>
  )
}

export default App

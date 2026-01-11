import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import DashboardPage from "@pages/DashboardPage";
import DemoPage from "@pages/DemoPage";
import NotFoundPage from "@pages/NotFoundPage";
import MarketPage from "@pages/MarketPage";
import IncomePage from "@pages/IncomePage";
import ChartPage from "@pages/ChartPage";
import FundsPage from "@pages/FundsPage";
import PortfolioPage from "@pages/PortfolioPage";
import HistoryPage from "@pages/HistoryPage";
import NewsPage from "@pages/NewsPage";
import FeedbackPage from "@pages/FeedbackPage";

// Layouts
import MainLayout from "@components/layouts/MainLayout";
import AuthLayout from "@components/layouts/AuthLayout";
import DashboardLayout from "@components/layouts/DashboardLayout";

// Hooks
import { useAuthStore } from "@store/authStore";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

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
            <Route path="/market" element={<MarketPage />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/chart" element={<ChartPage />} />
            <Route path="/funds" element={<FundsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/accounts" element={<div>Accounts Page</div>} />
            <Route path="/trades" element={<div>Trades Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            <Route path="/challenges" element={<div>Challenges Page</div>} />
            <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
          </Route>

          {/* Demo Page - Public access to showcase UI components */}
          <Route path="/demo" element={<DemoPage />} />

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
            background: "white",
            border: "1px solid #e5e7eb",
          },
        }}
      />
    </>
  );
}

export default App;

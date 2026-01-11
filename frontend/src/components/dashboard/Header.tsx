import { Search, Bell, Settings as SettingsIcon, User } from "lucide-react";
import { useAuthStore } from "@store/authStore";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/market": "Market Update",
    "/income": "Income Estimator",
    "/chart": "Interactive Chart",
    "/funds": "Mutual Funds",
    "/portfolio": "Portfolio",
    "/settings": "Settings",
    "/history": "History",
    "/news": "News",
    "/feedback": "Feedback",
    "/accounts": "Accounts",
    "/trades": "Trades",
    "/analytics": "Analytics",
    "/challenges": "Challenges",
    "/leaderboard": "Leaderboard",
  };
  return routes[pathname] || "Dashboard";
};

export default function Header() {
  const { user } = useAuthStore();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-40 h-16 bg-gray-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="h-full px-6 flex items-center justify-between gap-6">
        {/* Page Title */}
        <div>
          <h2 className="text-xl font-semibold text-white">{pageTitle}</h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 h-10 pl-10 pr-4 bg-gray-800/50 border border-white/5 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Notification Icon */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Settings Icon */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <SettingsIcon size={20} />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <User size={18} className="text-gray-900" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white">
                {user?.firstName || user?.username || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

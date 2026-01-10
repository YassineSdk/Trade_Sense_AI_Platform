import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

export interface TopNavProps {
  logo?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  balance?: {
    fiat: number;
    trading: number;
    change: number;
  };
  onDeposit?: () => void;
  onLogout?: () => void;
  className?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  logo,
  user,
  balance,
  onDeposit,
  onLogout,
  className,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {logo ? (
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              <>
                <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-white">TradeSense</span>
              </>
            )}
          </Link>

          {/* Balance & User */}
          <div className="flex items-center gap-6">
            {balance && (
              <div className="hidden md:flex items-center gap-8 text-sm">
                <div>
                  <span className="text-gray-400">Fiat: </span>
                  <span className="text-white font-semibold">
                    ${balance.fiat.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Trading: </span>
                  <span
                    className={cn(
                      "font-semibold",
                      balance.change >= 0 ? "text-profit" : "text-loss",
                    )}
                  >
                    ${balance.trading.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {onDeposit && (
              <Button variant="primary" size="sm" onClick={onDeposit}>
                Deposit
              </Button>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-gray-800"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gradient-to-br from-primary to-purple flex items-center justify-center">
                      <span className="text-gray-900 font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-20">
                      <div className="p-4 border-b border-gray-800">
                        <p className="text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Settings
                        </Link>
                      </div>
                      {onLogout && (
                        <>
                          <div className="border-t border-gray-800" />
                          <div className="py-2">
                            <button
                              onClick={() => {
                                setIsUserMenuOpen(false);
                                onLogout();
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-loss hover:bg-gray-800 transition-colors"
                            >
                              Logout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

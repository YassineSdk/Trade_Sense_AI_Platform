import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

export interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: string | number;
}

export interface SidebarProps {
  items?: SidebarItem[];
  className?: string;
}

const defaultItems: SidebarItem[] = [
  {
    id: "discover",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    label: "Discover",
    path: "/discover",
  },
  {
    id: "assets",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    label: "Assets",
    path: "/assets",
  },
  {
    id: "funds",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Funds",
    path: "/funds",
  },
  {
    id: "calendar",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "Economic Calendar",
    path: "/calendar",
  },
  {
    id: "settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Settings",
    path: "/settings",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  items = defaultItems,
  className,
}) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "w-64 h-screen sticky top-0 bg-gray-900 border-r border-gray-800 p-6",
        "hidden lg:block",
        className,
      )}
    >
      <div className="space-y-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
                "text-left transition-all group relative",
                isActive
                  ? "bg-primary text-gray-900 font-semibold shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "transition-transform group-hover:scale-110",
                  isActive && "scale-110",
                )}
              >
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                    isActive
                      ? "bg-gray-900 text-primary"
                      : "bg-gray-800 text-gray-400",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple/10 border border-primary/20">
          <p className="text-sm text-white font-semibold mb-1">
            Upgrade to Pro
          </p>
          <p className="text-xs text-gray-400 mb-3">
            Get advanced trading features and AI insights
          </p>
          <button className="w-full px-3 py-2 bg-primary text-gray-900 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

// Mobile Sidebar
export const MobileSidebar: React.FC<
  SidebarProps & { isOpen: boolean; onClose: () => void }
> = ({ items = defaultItems, isOpen, onClose, className }) => {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-gray-900 border-r border-gray-800 p-6 z-50",
          "transform transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-white">TradeSense</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
                  "text-left transition-all",
                  isActive
                    ? "bg-primary text-gray-900 font-semibold"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                )}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      isActive
                        ? "bg-gray-900 text-primary"
                        : "bg-gray-800 text-gray-400",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

import React from "react";
import { TopNav, TopNavProps } from "./TopNav";
import { Sidebar, MobileSidebar } from "./Sidebar";
import { cn } from "../../utils/cn";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  navProps?: TopNavProps;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  navProps,
  className,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <TopNav {...navProps} />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 rounded-full bg-primary text-gray-900 shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex">
        <Sidebar />
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className={cn("flex-1 p-6", className)}>
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

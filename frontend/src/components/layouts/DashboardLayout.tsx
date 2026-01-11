import { Outlet } from "react-router-dom";
import Sidebar from "@components/dashboard/Sidebar";
import Header from "@components/dashboard/Header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-[280px] min-h-screen flex flex-col">
        {/* Top Header */}
        <Header />

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { Outlet, Link } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">TradeSense AI</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.firstName || user?.username}</span>
            <button onClick={logout} className="btn-danger">Logout</button>
          </div>
        </div>
      </nav>
      <main className="container-custom py-8">
        <Outlet />
      </main>
    </div>
  )
}

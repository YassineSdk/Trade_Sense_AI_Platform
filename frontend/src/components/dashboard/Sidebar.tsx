import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  TrendingUp,
  Calculator,
  LineChart,
  PieChart,
  Briefcase,
  Settings,
  History,
  Newspaper,
  MessageSquare,
  ChevronRight
} from 'lucide-react'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  badge?: string
}

interface NavSection {
  title?: string
  items: NavItem[]
}

const navigationSections: NavSection[] = [
  {
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard size={20} />
      },
      {
        label: 'Market Update',
        path: '/market',
        icon: <TrendingUp size={20} />
      },
      {
        label: 'Income Estimator',
        path: '/income',
        icon: <Calculator size={20} />
      },
      {
        label: 'Interactive Chart',
        path: '/chart',
        icon: <LineChart size={20} />
      },
      {
        label: 'Mutual Funds',
        path: '/funds',
        icon: <PieChart size={20} />
      }
    ]
  },
  {
    title: 'Account',
    items: [
      {
        label: 'Portfolio',
        path: '/portfolio',
        icon: <Briefcase size={20} />
      },
      {
        label: 'Settings',
        path: '/settings',
        icon: <Settings size={20} />
      },
      {
        label: 'History',
        path: '/history',
        icon: <History size={20} />
      }
    ]
  },
  {
    title: 'Utility',
    items: [
      {
        label: 'News',
        path: '/news',
        icon: <Newspaper size={20} />,
        badge: '5'
      },
      {
        label: 'Feedback',
        path: '/feedback',
        icon: <MessageSquare size={20} />
      }
    ]
  }
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-r border-white/5 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <TrendingUp size={24} className="text-gray-900" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">TradeSense</h1>
            <p className="text-xs text-gray-400">AI Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                        isActive
                          ? 'bg-primary/10 text-primary shadow-lg shadow-primary/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                        )}

                        {/* Icon */}
                        <span className={`flex-shrink-0 ${isActive ? 'text-primary' : ''}`}>
                          {item.icon}
                        </span>

                        {/* Label */}
                        <span className="flex-1 font-medium text-sm">
                          {item.label}
                        </span>

                        {/* Badge */}
                        {item.badge && (
                          <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-gray-900 text-xs font-bold">
                            {item.badge}
                          </span>
                        )}

                        {/* Chevron on hover */}
                        <ChevronRight
                          size={16}
                          className={`flex-shrink-0 opacity-0 -translate-x-1 transition-all duration-200 ${
                            isActive ? 'opacity-100 translate-x-0' : 'group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
          <span>System Online</span>
        </div>
      </div>
    </aside>
  )
}

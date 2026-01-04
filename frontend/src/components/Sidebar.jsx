import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Trophy,
  User,
  BookOpen,
  Settings,
  LogOut,
  TrendingUp,
  Bell,
  BarChart3,
} from 'lucide-react';

const Sidebar = ({ isOpen = true }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Trading', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: BookOpen, label: 'MasterClass', path: '/masterclass' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const sidebarVariants = {
    open: {
      width: '240px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    closed: {
      width: '80px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="open"
      animate={isOpen ? 'open' : 'closed'}
      className="fixed left-0 top-0 h-screen bg-dark-secondary border-r border-dark-tertiary z-40 flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-dark-tertiary">
        <NavLink to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 bg-gradient-green rounded-lg flex items-center justify-center"
          >
            <TrendingUp className="w-6 h-6 text-dark-primary" />
          </motion.div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-xl font-bold gradient-text">TradeSense</h1>
              <p className="text-xs text-gray-500">AI Trading</p>
            </motion.div>
          )}
        </NavLink>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'sidebar-item-active'
                      : 'text-gray-400 hover:text-green-primary hover:bg-dark-tertiary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          isActive ? 'text-dark-primary' : 'text-current'
                        }`}
                      />
                    </motion.div>
                    {isOpen && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1 h-6 bg-dark-primary rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-dark-tertiary">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-300"
          onClick={() => {
            // Handle logout
            window.location.href = '/login';
          }}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="font-medium text-sm">Logout</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Bell,
  User,
  ChevronDown,
  Settings,
  LogOut,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';

const Navbar = ({ onMenuToggle, isMenuOpen = true }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, type: 'success', message: 'Trade executed successfully', time: '2m ago' },
    { id: 2, type: 'warning', message: 'Stop loss triggered on EUR/USD', time: '15m ago' },
    { id: 3, type: 'info', message: 'New AI signal available', time: '1h ago' },
  ];

  const notificationIcon = (type) => {
    const colors = {
      success: 'text-green-400',
      warning: 'text-yellow-400',
      info: 'text-blue-400',
    };
    return colors[type] || 'text-gray-400';
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 left-0 md:left-60 h-16 bg-dark-secondary border-b border-dark-tertiary z-30 flex items-center justify-between px-6"
    >
      {/* Left Section - Menu Toggle & Title */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onMenuToggle}
          className="md:hidden text-gray-400 hover:text-green-primary transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>

        <div className="hidden md:block">
          <h2 className="text-xl font-bold text-gray-100">Trading Dashboard</h2>
          <p className="text-xs text-gray-500">Real-time market insights</p>
        </div>
      </div>

      {/* Center Section - Quick Stats */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Market: <span className="text-green-400 font-semibold">Open</span></span>
        </div>
        <div className="h-6 w-px bg-dark-tertiary"></div>
        <div className="text-sm text-gray-400">
          Server: <span className="text-green-400 font-semibold">Connected</span>
        </div>
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-green-primary transition-colors rounded-lg hover:bg-dark-tertiary"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse-dot"></span>
          </motion.button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-dark-secondary border border-dark-tertiary rounded-lg shadow-dark-xl overflow-hidden"
            >
              <div className="p-4 border-b border-dark-tertiary">
                <h3 className="font-semibold text-gray-100">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                    className="p-4 border-b border-dark-tertiary cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${notificationIcon(notification.type)}`}>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 border-t border-dark-tertiary">
                <button className="text-sm text-green-primary hover:text-green-secondary font-medium w-full text-center">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-tertiary transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-green rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-dark-primary" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-100">John Trader</p>
              <p className="text-xs text-gray-500">Pro Account</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 bg-dark-secondary border border-dark-tertiary rounded-lg shadow-dark-xl overflow-hidden"
            >
              <div className="p-4 border-b border-dark-tertiary">
                <p className="font-semibold text-gray-100">John Trader</p>
                <p className="text-xs text-gray-500">john.trader@email.com</p>
              </div>
              <div className="py-2">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-green-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-green-primary transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-green-primary transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Trading Stats
                </motion.button>
              </div>
              <div className="border-t border-dark-tertiary">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedButton from '../components/AnimatedButton';
import {
  TrendingUp,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Success - navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
        setLoading(false);
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    // Implement social login logic here
    console.log(`Login with ${provider}`);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center relative overflow-hidden">
      <ParticleBackground density={80} opacity={0.3} />

      {/* Animated gradient background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 127, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(52, 211, 153, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 255, 127, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      />

      {/* Back to Home Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-green-primary transition-colors z-20"
      >
        <div className="w-10 h-10 bg-gradient-green rounded-lg flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-dark-primary" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-lg font-bold gradient-text">TradeSense AI</h1>
        </div>
      </motion.button>

      {/* Login Form Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md mx-4"
      >
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-8 md:p-10 border border-gray-800 shadow-dark-xl"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-16 h-16 bg-gradient-green rounded-xl flex items-center justify-center mx-auto mb-4"
            >
              <TrendingUp className="w-8 h-8 text-dark-primary" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-400">Login to access your trading dashboard</p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-base pl-12"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-base pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 bg-dark-secondary border-dark-tertiary rounded focus:ring-2 focus:ring-green-primary text-green-primary cursor-pointer"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-green-primary hover:text-green-secondary transition-colors"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <AnimatedButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={loading ? null : <ArrowRight className="w-5 h-5" />}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner w-5 h-5 border-2"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login to Dashboard'
                )}
              </AnimatedButton>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-tertiary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-secondary text-gray-500">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-2 p-3 bg-dark-tertiary hover:bg-dark-primary border border-gray-700 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              <FaGoogle className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center gap-2 p-3 bg-dark-tertiary hover:bg-dark-primary border border-gray-700 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              <FaGithub className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialLogin('twitter')}
              className="flex items-center justify-center gap-2 p-3 bg-dark-tertiary hover:bg-dark-primary border border-gray-700 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              <FaTwitter className="w-5 h-5 text-gray-300" />
            </motion.button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-green-primary hover:text-green-secondary font-semibold transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-green-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-green-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

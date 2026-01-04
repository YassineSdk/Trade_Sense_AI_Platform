import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedButton from '../components/AnimatedButton';
import {
  TrendingUp,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Phone,
} from 'lucide-react';
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return { label: '', color: '' };
    if (passwordStrength <= 2) return { label: 'Weak', color: 'text-red-400' };
    if (passwordStrength <= 3) return { label: 'Medium', color: 'text-yellow-400' };
    if (passwordStrength <= 4) return { label: 'Strong', color: 'text-green-400' };
    return { label: 'Very Strong', color: 'text-green-500' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Please choose a stronger password');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Success - navigate to dashboard
      navigate('/dashboard');
    }, 1500);
  };

  const handleSocialRegister = (provider) => {
    setLoading(true);
    // Implement social registration logic here
    console.log(`Register with ${provider}`);
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

  const strengthMeter = getPasswordStrengthLabel();

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center relative overflow-hidden py-12">
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

      {/* Register Form Container */}
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
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-400">Join thousands of successful traders</p>
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

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-base pl-12"
                  required
                />
              </div>
            </motion.div>

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

            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="input-base pl-12"
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
                  placeholder="Create a strong password"
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
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength
                            ? passwordStrength <= 2
                              ? 'bg-red-400'
                              : passwordStrength <= 3
                              ? 'bg-yellow-400'
                              : 'bg-green-400'
                            : 'bg-dark-tertiary'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${strengthMeter.color}`}>
                    {strengthMeter.label && `Password strength: ${strengthMeter.label}`}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="input-base pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-primary transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Passwords do not match
                </p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Passwords match
                </p>
              )}
            </motion.div>

            {/* Terms & Conditions */}
            <motion.div variants={itemVariants}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 bg-dark-secondary border-dark-tertiary rounded focus:ring-2 focus:ring-green-primary text-green-primary cursor-pointer"
                  required
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-green-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-green-primary hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
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
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </AnimatedButton>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-tertiary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-secondary text-gray-500">Or register with</span>
            </div>
          </motion.div>

          {/* Social Registration Buttons */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialRegister('google')}
              className="flex items-center justify-center gap-2 p-3 bg-dark-tertiary hover:bg-dark-primary border border-gray-700 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              <FaGoogle className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialRegister('github')}
              className="flex items-center justify-center gap-2 p-3 bg-dark-tertiary hover:bg-dark-primary border border-gray-700 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              <FaGithub className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialRegister('twitter')}
              className="flex items-center justify-center gap-2 p-3 bg-dark-tertiary hover:bg-dark-primary border border-gray-700 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              <FaTwitter className="w-5 h-5 text-gray-300" />
            </motion.button>
          </motion.div>

          {/* Login Link */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-green-primary hover:text-green-secondary font-semibold transition-colors"
              >
                Login here
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          variants={itemVariants}
          className="mt-6 grid grid-cols-3 gap-4 text-center"
        >
          <div className="glass p-4 rounded-lg border border-gray-800">
            <div className="text-green-400 mb-2">✓</div>
            <p className="text-xs text-gray-400">Free Trial</p>
          </div>
          <div className="glass p-4 rounded-lg border border-gray-800">
            <div className="text-green-400 mb-2">✓</div>
            <p className="text-xs text-gray-400">No Credit Card</p>
          </div>
          <div className="glass p-4 rounded-lg border border-gray-800">
            <div className="text-green-400 mb-2">✓</div>
            <p className="text-xs text-gray-400">Cancel Anytime</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

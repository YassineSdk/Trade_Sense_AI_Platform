import { motion } from 'framer-motion';

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  icon,
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 transform flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-gradient-green text-dark-primary hover:shadow-glow-md',
    secondary: 'border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-dark-primary',
    outline: 'border border-gray-600 text-gray-300 hover:border-green-primary hover:text-green-primary',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : "initial"}
      whileTap={!disabled ? "tap" : "initial"}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledClasses}
        ${widthClass}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;

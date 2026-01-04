import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 2,
  className = '',
  color = 'text-gray-100',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * value;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  const formattedValue = typeof value === 'number'
    ? displayValue.toFixed(decimals)
    : displayValue;

  // Determine color based on value for PnL displays
  const getValueColor = () => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return color;
  };

  const displayColor = color === 'auto' ? getValueColor() : color;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${displayColor} font-bold ${className}`}
    >
      {prefix}{formattedValue}{suffix}
    </motion.div>
  );
};

export default AnimatedCounter;

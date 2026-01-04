import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  className = '',
  delay = 0,
  hover = true,
  onClick,
  ...props
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const hoverVariants = hover ? {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  } : {};

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={hoverVariants}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={`card-hover ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;

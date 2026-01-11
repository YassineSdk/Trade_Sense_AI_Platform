import { motion } from "framer-motion";

interface OrbProps {
  className?: string;
}

export const Orb: React.FC<OrbProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main central orb - large and bold */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, #C7FF00 0%, #8B5CF6 30%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary orb - top right */}
      <motion.div
        className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, #8B5CF6 0%, #C7FF00 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, -90, -180],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary orb - bottom left */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, #10B981 0%, #C7FF00 35%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -80, 0],
          y: [0, 80, 0],
          rotate: [0, 120, 240],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Accent orb - floating */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, #EF4444 0%, #8B5CF6 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 150, 0],
          y: [0, -100, 0],
          rotate: [0, 270, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small accent orbs scattered */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[200px] h-[200px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "#C7FF00" : "#8B5CF6"
            } 0%, transparent 70%)`,
            filter: "blur(40px)",
            top: `${20 + i * 15}%`,
            left: `${10 + i * 18}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, (i % 2 === 0 ? 1 : -1) * 50, 0],
            y: [0, (i % 2 === 0 ? -1 : 1) * 50, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Animated particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Rotating ring effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          border: "2px solid rgba(199, 255, 0, 0.1)",
          filter: "blur(2px)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          border: "1px solid rgba(139, 92, 246, 0.08)",
          filter: "blur(1px)",
        }}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid overlay - subtle */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(199, 255, 0, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(199, 255, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
};

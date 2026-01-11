import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoItem {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

interface MagicBentoProps {
  items: BentoItem[];
  className?: string;
}

export const MagicBento: React.FC<MagicBentoProps> = ({
  items,
  className = "",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        duration: 0.5,
      },
    },
  };

  // Define minimal bento grid pattern for 6 items
  const getBentoClass = (index: number) => {
    const patterns = [
      "md:col-span-2", // Item 0: Wide
      "md:col-span-1", // Item 1: Normal
      "md:col-span-1", // Item 2: Normal
      "md:col-span-1", // Item 3: Normal
      "md:col-span-1", // Item 4: Normal
      "md:col-span-2", // Item 5: Wide
    ];
    return patterns[index % patterns.length];
  };

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-3 gap-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((item, index) => {
        const bentoClass = getBentoClass(index);

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -4,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className={`
              group relative overflow-hidden rounded-2xl p-5
              bg-gray-900/40 backdrop-blur-2xl
              border border-white/5
              hover:bg-gray-900/50 hover:border-primary/20
              hover:shadow-lg hover:shadow-primary/5
              transition-all duration-300 ease-out
              ${bentoClass}
              ${item.className || ""}
            `}
          >
            {/* Subtle gradient orb on hover */}
            <div
              className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"
              style={{
                background:
                  "radial-gradient(circle, rgba(199, 255, 0, 0.15) 0%, transparent 70%)",
              }}
            />

            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3">
              {/* Icon */}
              {item.icon && (
                <motion.div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/5 text-primary border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-300 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400/80 group-hover:text-gray-300/90 transition-colors duration-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Minimal corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/40 to-transparent" />
              <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-primary/40 to-transparent" />
            </div>

            {/* Noise texture for depth */}
            <div
              className="absolute inset-0 opacity-[0.01] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

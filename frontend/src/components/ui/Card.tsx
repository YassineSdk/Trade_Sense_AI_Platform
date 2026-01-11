import React from "react";
import { cn } from "../../utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "glass",
      padding = "md",
      hover = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      glass: `
        bg-gray-900/30 backdrop-blur-2xl border border-white/5
        shadow-lg shadow-black/10
        relative overflow-hidden
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-white/[0.03] before:via-transparent before:to-transparent
        before:pointer-events-none
      `,
      solid: `
        bg-gray-900/80 backdrop-blur-xl border border-white/10
        shadow-xl shadow-black/20
      `,
      elevated: `
        bg-gray-900/60 backdrop-blur-2xl border border-white/10
        shadow-2xl shadow-primary/5
        relative overflow-hidden
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-primary/[0.02] before:via-transparent before:to-purple/[0.02]
        before:pointer-events-none
      `,
    };

    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-5",
      lg: "p-6",
    };

    const hoverEffect = hover
      ? "hover:bg-gray-900/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          variants[variant],
          paddings[padding],
          hoverEffect,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

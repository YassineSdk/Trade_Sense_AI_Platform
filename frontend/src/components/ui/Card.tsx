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
        bg-gray-900/50 backdrop-blur-xl border border-white/10
      `,
      solid: `
        bg-gray-900 border border-gray-800
      `,
      elevated: `
        bg-gray-900 border border-gray-800
        shadow-2xl shadow-black/50
      `,
    };

    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    const hoverEffect = hover
      ? "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
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

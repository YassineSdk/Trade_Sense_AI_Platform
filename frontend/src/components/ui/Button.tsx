import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      rounded-lg font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-offset-gray-900 disabled:opacity-50
      disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-primary text-gray-900 hover:bg-primary/90
        shadow-lg shadow-primary/20 hover:shadow-primary/40
        focus:ring-primary/50
      `,
      secondary: `
        bg-gray-800 text-white border border-gray-700
        hover:bg-gray-700 hover:border-gray-600
        focus:ring-gray-700
      `,
      outline: `
        bg-transparent text-primary border-2 border-primary
        hover:bg-primary hover:text-gray-900
        focus:ring-primary/50
      `,
      ghost: `
        bg-transparent text-white hover:bg-white/10
        focus:ring-white/20
      `,
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && icon}
        {children}
        {!loading && icon && iconPosition === "right" && icon}
      </button>
    );
  },
);

Button.displayName = "Button";

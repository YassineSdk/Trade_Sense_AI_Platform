import React from "react";
import { cn } from "../../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = "left",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-gray-900 border border-gray-800",
              "text-white placeholder-gray-500",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              "transition-all outline-none",
              icon && iconPosition === "left" && "pl-11",
              icon && iconPosition === "right" && "pr-11",
              error && "border-loss focus:border-loss focus:ring-loss/20",
              className,
            )}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-loss">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export interface SearchInputProps extends Omit<InputProps, "icon"> {
  onSearch?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onSearch?.(e.target.value);
    };

    return (
      <Input
        ref={ref}
        type="text"
        onChange={handleChange}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
        iconPosition="left"
        {...props}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";

export interface TradingInputProps extends Omit<InputProps, "type"> {
  unit?: string;
}

export const TradingInput = React.forwardRef<HTMLInputElement, TradingInputProps>(
  ({ unit, className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="number"
        className={cn("font-mono text-lg", className)}
        icon={unit ? <span className="font-medium">{unit}</span> : undefined}
        iconPosition="right"
        {...props}
      />
    );
  },
);

TradingInput.displayName = "TradingInput";

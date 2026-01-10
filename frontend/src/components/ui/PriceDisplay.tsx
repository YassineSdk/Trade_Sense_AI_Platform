import React from "react";
import { cn } from "../../utils/cn";

export interface PriceDisplayProps {
  price: number;
  change?: number;
  changePercent?: number;
  size?: "sm" | "md" | "lg";
  showTrend?: boolean;
  currency?: string;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  change,
  changePercent,
  size = "md",
  showTrend = true,
  currency = "$",
  className,
}) => {
  const isPositive = change !== undefined ? change >= 0 : true;
  const trendColor = isPositive ? "text-profit" : "text-loss";
  const trendIcon = isPositive ? "↑" : "↓";

  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const trendSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span className={cn("font-mono font-bold text-white", sizeClasses[size])}>
        {currency}
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      {showTrend && changePercent !== undefined && (
        <div className={cn("flex items-center gap-1 font-medium", trendColor)}>
          <span className={trendSizeClasses[size]}>{trendIcon}</span>
          <span className={trendSizeClasses[size]}>
            {isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%
          </span>
        </div>
      )}
      {showTrend && change !== undefined && changePercent === undefined && (
        <div className={cn("flex items-center gap-1 font-medium", trendColor)}>
          <span className={trendSizeClasses[size]}>{trendIcon}</span>
          <span className={trendSizeClasses[size]}>
            {isPositive ? "+" : ""}
            {currency}
            {Math.abs(change).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      )}
    </div>
  );
};

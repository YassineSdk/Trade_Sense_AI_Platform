import React from "react";
import { cn } from "../../utils/cn";

export interface MarketPairProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export const MarketPair: React.FC<MarketPairProps> = ({
  symbol,
  name,
  price,
  change,
  volume,
  icon,
  onClick,
  className,
}) => {
  const isPositive = change >= 0;
  const trendColor = isPositive ? "text-profit" : "text-loss";

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-4 rounded-lg",
        "bg-gray-900/50 hover:bg-gray-800/50 transition-colors",
        onClick && "cursor-pointer",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <img
            src={icon}
            alt={symbol}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%236C4FE0'/%3E%3Ctext x='16' y='21' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3E" + symbol.charAt(0) + "%3C/text%3E%3C/svg%3E";
            }}
          />
        )}
        {!icon && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple flex items-center justify-center">
            <span className="text-gray-900 font-bold text-sm">
              {symbol.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <div className="font-semibold text-white">{symbol}</div>
          <div className="text-sm text-gray-400">{name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono font-semibold text-white">
          ${price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className={cn("text-sm font-medium", trendColor)}>
          {isPositive ? "+" : ""}
          {change.toFixed(2)}%
        </div>
        {volume && (
          <div className="text-xs text-gray-500 mt-1">
            Vol: {volume}
          </div>
        )}
      </div>
    </div>
  );
};

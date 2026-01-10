import React from "react";
import { Card } from "./Card";
import { PriceDisplay } from "./PriceDisplay";
import { cn } from "../../utils/cn";

export interface ChartCardProps {
  title: string;
  value: number;
  change?: {
    value: number;
    percent: number;
  };
  timeframe?: string;
  timeframes?: string[];
  onTimeframeChange?: (timeframe: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  value,
  change,
  timeframe = "1D",
  timeframes = ["1H", "1D", "1W", "1M", "6M", "1Y"],
  onTimeframeChange,
  children,
  className,
}) => {
  return (
    <Card variant="glass" padding="lg" className={className}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h3 className="text-lg text-gray-400 mb-1">{title}</h3>
          {change ? (
            <PriceDisplay
              price={value}
              change={change.value}
              changePercent={change.percent}
              size="lg"
            />
          ) : (
            <PriceDisplay price={value} size="lg" showTrend={false} />
          )}
        </div>

        {onTimeframeChange && (
          <div className="flex gap-2 flex-wrap">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  timeframe === tf
                    ? "bg-primary text-gray-900"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white",
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-64 md:h-96">{children}</div>
    </Card>
  );
};

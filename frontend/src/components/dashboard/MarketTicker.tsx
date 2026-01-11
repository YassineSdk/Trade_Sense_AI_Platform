import { TrendingUp, TrendingDown } from 'lucide-react'

interface MarketMetric {
  symbol: string
  name: string
  value: string
  change: number
  changePercent: number
  sparkline?: number[]
}

const marketMetrics: MarketMetric[] = [
  {
    symbol: 'GOLD',
    name: 'Gold',
    value: '2,048.50',
    change: 12.34,
    changePercent: 0.61
  },
  {
    symbol: 'DOW',
    name: 'DOW 32',
    value: '38,085.80',
    change: -156.23,
    changePercent: -0.41
  },
  {
    symbol: 'SPX',
    name: 'S&P 500',
    value: '5,048.42',
    change: 23.87,
    changePercent: 0.47
  },
  {
    symbol: 'NASDAQ',
    name: 'NASDAQ',
    value: '15,983.08',
    change: 85.34,
    changePercent: 0.54
  },
  {
    symbol: 'DSEX',
    name: 'DSEX',
    value: '6,234.56',
    change: -45.23,
    changePercent: -0.72
  },
  {
    symbol: 'DSES',
    name: 'DSES',
    value: '1,456.78',
    change: 12.45,
    changePercent: 0.86
  }
]

export default function MarketTicker() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {marketMetrics.map((metric) => {
        const isPositive = metric.change >= 0

        return (
          <div
            key={metric.symbol}
            className="bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all duration-200 group"
          >
            {/* Symbol & Name */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {metric.symbol}
              </span>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-profit' : 'text-loss'}`}>
                {isPositive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
              </div>
            </div>

            {/* Value */}
            <div className="mb-1">
              <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                {metric.value}
              </p>
            </div>

            {/* Change */}
            <div className="flex items-baseline gap-2">
              <span className={`text-sm font-semibold ${isPositive ? 'text-profit' : 'text-loss'}`}>
                {isPositive ? '+' : ''}{metric.change.toFixed(2)}
              </span>
              <span className={`text-xs ${isPositive ? 'text-profit' : 'text-loss'}`}>
                ({isPositive ? '+' : ''}{metric.changePercent.toFixed(2)}%)
              </span>
            </div>

            {/* Mini Sparkline (visual indicator) */}
            <div className="mt-3 h-8 flex items-end gap-0.5">
              {[...Array(12)].map((_, i) => {
                const height = 20 + Math.random() * 80
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t transition-all duration-200 ${
                      isPositive
                        ? 'bg-profit/20 group-hover:bg-profit/40'
                        : 'bg-loss/20 group-hover:bg-loss/40'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

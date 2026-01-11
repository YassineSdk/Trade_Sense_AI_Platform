import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StockExchangeSummary() {
  const indexValue = 6234.56
  const dayChange = 78.34
  const changePercent = 1.27
  const isPositive = dayChange >= 0

  const dayOpen = 6156.22
  const dayHigh = 6289.45
  const dayLow = 6142.18

  const weekLow52 = 5234.12
  const weekHigh52 = 6789.34
  const currentPosition = ((indexValue - weekLow52) / (weekHigh52 - weekLow52)) * 100

  const return6Month = 8.45
  const return1Year = 15.67

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-400 mb-2">DSEX Index</h3>

        {/* Large Index Value */}
        <div className="flex items-baseline gap-3 mb-3">
          <p className="text-4xl font-bold text-white">{indexValue.toFixed(2)}</p>
          <div className={`flex items-center gap-1.5 ${isPositive ? 'text-profit' : 'text-loss'}`}>
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span className="text-xl font-bold">
              {isPositive ? '+' : ''}{dayChange.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Change Percentage */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          isPositive ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'
        }`}>
          <span className="text-sm font-semibold">
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
          <span className="text-xs">Today</span>
        </div>
      </div>

      {/* Day Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-900/50 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Day Open</p>
          <p className="text-sm font-bold text-white">{dayOpen.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Day High</p>
          <p className="text-sm font-bold text-profit">{dayHigh.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Day Low</p>
          <p className="text-sm font-bold text-loss">{dayLow.toFixed(2)}</p>
        </div>
      </div>

      {/* 52-Week Range Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>52-Week Range</span>
          <span className="text-white font-medium">{indexValue.toFixed(2)}</span>
        </div>

        {/* Range Bar */}
        <div className="relative h-2 bg-gray-900/50 rounded-full overflow-hidden">
          {/* Gradient Fill */}
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-loss via-yellow-500 to-profit rounded-full"
            style={{ width: `${currentPosition}%` }}
          />

          {/* Current Position Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-900 shadow-lg"
            style={{ left: `${currentPosition}%` }}
          />
        </div>

        {/* Range Labels */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span>{weekLow52.toFixed(2)}</span>
          <span>{weekHigh52.toFixed(2)}</span>
        </div>
      </div>

      {/* Returns */}
      <div className="mt-auto">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/50 rounded-lg p-3 border border-white/5">
            <p className="text-xs text-gray-400 mb-1">6 Month Return</p>
            <div className="flex items-center gap-1.5">
              <p className={`text-lg font-bold ${return6Month >= 0 ? 'text-profit' : 'text-loss'}`}>
                {return6Month >= 0 ? '+' : ''}{return6Month.toFixed(2)}%
              </p>
              {return6Month >= 0 ? (
                <TrendingUp size={14} className="text-profit" />
              ) : (
                <TrendingDown size={14} className="text-loss" />
              )}
            </div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 border border-white/5">
            <p className="text-xs text-gray-400 mb-1">1 Year Return</p>
            <div className="flex items-center gap-1.5">
              <p className={`text-lg font-bold ${return1Year >= 0 ? 'text-profit' : 'text-loss'}`}>
                {return1Year >= 0 ? '+' : ''}{return1Year.toFixed(2)}%
              </p>
              {return1Year >= 0 ? (
                <TrendingUp size={14} className="text-profit" />
              ) : (
                <TrendingDown size={14} className="text-loss" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

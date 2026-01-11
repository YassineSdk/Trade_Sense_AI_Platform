import { TrendingUp, TrendingDown } from 'lucide-react'

interface StockData {
  instrument: string
  ltp: number
  change: number
  changePercent: number
  value: string
  volume: number
  volumeMax: number
}

const stockData: StockData[] = [
  {
    instrument: 'GRAMEENPHONE',
    ltp: 342.50,
    change: 8.50,
    changePercent: 2.54,
    value: '₹1,234.5M',
    volume: 2456789,
    volumeMax: 3000000
  },
  {
    instrument: 'BEXIMCO',
    ltp: 156.20,
    change: -3.40,
    changePercent: -2.13,
    value: '₹987.2M',
    volume: 1876543,
    volumeMax: 3000000
  },
  {
    instrument: 'SQUARE PHARMA',
    ltp: 289.75,
    change: 5.25,
    changePercent: 1.85,
    value: '₹876.3M',
    volume: 1654321,
    volumeMax: 3000000
  },
  {
    instrument: 'BRAC BANK',
    ltp: 78.90,
    change: 1.20,
    changePercent: 1.54,
    value: '₹765.8M',
    volume: 2234567,
    volumeMax: 3000000
  },
  {
    instrument: 'RENATA',
    ltp: 1245.00,
    change: -12.50,
    changePercent: -0.99,
    value: '₹654.2M',
    volume: 987654,
    volumeMax: 3000000
  },
  {
    instrument: 'WALTON',
    ltp: 985.50,
    change: 15.30,
    changePercent: 1.58,
    value: '₹543.7M',
    volume: 1456789,
    volumeMax: 3000000
  },
  {
    instrument: 'OLYMPIC',
    ltp: 167.80,
    change: -2.10,
    changePercent: -1.24,
    value: '₹432.9M',
    volume: 1123456,
    volumeMax: 3000000
  },
  {
    instrument: 'LHBL',
    ltp: 89.45,
    change: 3.45,
    changePercent: 4.01,
    value: '₹398.4M',
    volume: 1765432,
    volumeMax: 3000000
  }
]

export default function TopValueTable() {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5">
        <h3 className="text-lg font-semibold text-white">Top Value</h3>
        <p className="text-sm text-gray-400">Highest traded instruments today</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Sticky Header */}
          <thead className="bg-gray-900/50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Instrument
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                LTP
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Volume
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-white/5">
            {stockData.map((stock, index) => {
              const isPositive = stock.change >= 0
              const volumePercent = (stock.volume / stock.volumeMax) * 100

              return (
                <tr
                  key={stock.instrument}
                  className="group hover:bg-white/5 transition-all duration-200 cursor-pointer"
                >
                  {/* Instrument */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                          {stock.instrument}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* LTP */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <p className="text-sm font-bold text-white">
                      {stock.ltp.toFixed(2)}
                    </p>
                  </td>

                  {/* Change */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="inline-flex flex-col items-end">
                      <div className={`flex items-center gap-1 ${
                        isPositive ? 'text-profit' : 'text-loss'
                      }`}>
                        {isPositive ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )}
                        <span className="text-sm font-semibold">
                          {isPositive ? '+' : ''}{stock.change.toFixed(2)}
                        </span>
                      </div>
                      <span className={`text-xs ${
                        isPositive ? 'text-profit/70' : 'text-loss/70'
                      }`}>
                        ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>

                  {/* Value */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <p className="text-sm font-medium text-gray-300">
                      {stock.value}
                    </p>
                  </td>

                  {/* Volume with Mini Bar */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {/* Volume Bar */}
                      <div className="flex-1 h-2 bg-gray-900/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isPositive
                              ? 'bg-gradient-to-r from-profit/60 to-profit'
                              : 'bg-gradient-to-r from-loss/60 to-loss'
                          }`}
                          style={{ width: `${volumePercent}%` }}
                        />
                      </div>
                      {/* Volume Text */}
                      <p className="text-xs font-medium text-gray-400 w-16 text-right">
                        {(stock.volume / 1000000).toFixed(2)}M
                      </p>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-900/30 border-t border-white/5">
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All Instruments →
        </button>
      </div>
    </div>
  )
}

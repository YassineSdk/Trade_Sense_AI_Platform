interface SectorData {
  sector: string
  value: number
  percentage: number
  color: string
}

const sectorData: SectorData[] = [
  {
    sector: 'Banking',
    value: 2845.6,
    percentage: 28.5,
    color: '#10B981'
  },
  {
    sector: 'Pharmaceuticals',
    value: 2234.8,
    percentage: 22.3,
    color: '#6366F1'
  },
  {
    sector: 'Telecommunications',
    value: 1678.2,
    percentage: 16.8,
    color: '#F59E0B'
  },
  {
    sector: 'Engineering',
    value: 1456.9,
    percentage: 14.6,
    color: '#8B5CF6'
  },
  {
    sector: 'Textiles',
    value: 987.4,
    percentage: 9.9,
    color: '#EC4899'
  },
  {
    sector: 'Food & Beverage',
    value: 789.1,
    percentage: 7.9,
    color: '#14B8A6'
  }
]

const totalValue = sectorData.reduce((sum, sector) => sum + sector.value, 0)

export default function SectorDistribution() {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Today's Value by Sector</h3>
        <p className="text-sm text-gray-400">Total: ₹{totalValue.toFixed(1)}M</p>
      </div>

      {/* Sector Bars */}
      <div className="space-y-4">
        {sectorData.map((sector, index) => (
          <div
            key={sector.sector}
            className="group"
            style={{
              animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Sector Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: sector.color }}
                />
                <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                  {sector.sector}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold text-white">
                  ₹{sector.value.toFixed(1)}M
                </p>
                <p className="text-xs font-semibold text-gray-400 w-12 text-right">
                  {sector.percentage.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-900/50 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${sector.percentage}%`,
                  backgroundColor: sector.color,
                  boxShadow: `0 0 10px ${sector.color}40`
                }}
              >
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    animation: 'shimmer 2s infinite',
                    animationDelay: `${index * 0.2}s`
                  }}
                />
              </div>

              {/* Tooltip on hover */}
              <div className="absolute inset-0 flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded px-2 py-1 text-xs font-medium text-white shadow-lg">
                  {sector.percentage.toFixed(2)}% of total
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend/Summary */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>6 Sectors</span>
          <span>Updated 2 minutes ago</span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

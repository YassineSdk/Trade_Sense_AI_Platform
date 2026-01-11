import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TabOption {
  id: string
  label: string
}

const tabs: TabOption[] = [
  { id: 'dsex', label: 'DSEX' },
  { id: 'dses', label: 'DSES' },
  { id: 'ds30', label: 'DS30' }
]

interface ChartData {
  stats: {
    totalTrade: string
    totalVolume: string
    totalValue: string
  }
}

const chartDataByTab: Record<string, ChartData> = {
  dsex: {
    stats: {
      totalTrade: '245,678',
      totalVolume: '45.8M',
      totalValue: '₹8,234.5M'
    }
  },
  dses: {
    stats: {
      totalTrade: '156,234',
      totalVolume: '32.4M',
      totalValue: '₹5,678.2M'
    }
  },
  ds30: {
    stats: {
      totalTrade: '189,456',
      totalVolume: '38.9M',
      totalValue: '₹6,891.3M'
    }
  }
}

export default function MarketLineChart() {
  const [activeTab, setActiveTab] = useState('dsex')
  const currentData = chartDataByTab[activeTab]

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-full flex flex-col">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Market Overview</h3>

        <div className="flex items-center gap-1 bg-gray-900/50 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-gray-900 shadow-lg shadow-primary/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative mb-6">
        <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="600"
              y2={i * 50}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          ))}

          {/* Chart Line Path */}
          <path
            d="M 0,150 L 50,140 L 100,145 L 150,120 L 200,130 L 250,110 L 300,100 L 350,95 L 400,85 L 450,90 L 500,75 L 550,70 L 600,65"
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          />

          {/* Fill Area */}
          <path
            d="M 0,150 L 50,140 L 100,145 L 150,120 L 200,130 L 250,110 L 300,100 L 350,95 L 400,85 L 450,90 L 500,75 L 550,70 L 600,65 L 600,200 L 0,200 Z"
            fill="url(#chartGradient)"
          />

          {/* Data Points */}
          {[
            { x: 150, y: 120 },
            { x: 300, y: 100 },
            { x: 450, y: 90 },
            { x: 600, y: 65 }
          ].map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#10B981"
                className="animate-pulse"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                opacity="0.3"
              />
            </g>
          ))}
        </svg>

        {/* Current Value Indicator */}
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-400">Current</p>
              <p className="text-xl font-bold text-white">6,234.56</p>
            </div>
            <div className="flex items-center gap-1 text-profit">
              <TrendingUp size={16} />
              <span className="text-sm font-semibold">+2.34%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Total Trade</p>
          <p className="text-lg font-bold text-white">{currentData.stats.totalTrade}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Total Volume</p>
          <p className="text-lg font-bold text-white">{currentData.stats.totalVolume}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Total Value</p>
          <p className="text-lg font-bold text-white">{currentData.stats.totalValue}</p>
        </div>
      </div>
    </div>
  )
}

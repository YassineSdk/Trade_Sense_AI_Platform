export default function StrengthMeter() {
  const strengthValue = 72 // Out of 100
  const strengthLabel = 'Strong'

  // Calculate rotation for the needle (0-180 degrees)
  const needleRotation = (strengthValue / 100) * 180

  // Strength zones
  const zones = [
    { label: 'Weak', color: '#EF4444', range: '0-40' },
    { label: 'Moderate', color: '#F59E0B', range: '40-70' },
    { label: 'Strong', color: '#10B981', range: '70-100' }
  ]

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">DSEX Strength</h3>
        <p className="text-sm text-gray-400">Market sentiment indicator</p>
      </div>

      {/* Gauge Container */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Semi-circular Gauge */}
        <div className="relative w-64 h-32 mb-6">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <defs>
              {/* Gradient for gauge background */}
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background arc (dark) */}
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Colored arc segments */}
            {/* Weak zone (red) */}
            <path
              d="M 20 90 A 80 80 0 0 1 67 35"
              fill="none"
              stroke="#EF4444"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Moderate zone (yellow/orange) */}
            <path
              d="M 67 35 A 80 80 0 0 1 133 35"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Strong zone (green) */}
            <path
              d="M 133 35 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#10B981"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Needle */}
            <g
              transform={`rotate(${needleRotation - 180}, 100, 90)`}
              style={{ transition: 'transform 1s ease-out' }}
            >
              <line
                x1="100"
                y1="90"
                x2="100"
                y2="30"
                stroke="#C7FF00"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <circle
                cx="100"
                cy="90"
                r="6"
                fill="#C7FF00"
                filter="url(#glow)"
              />
            </g>

            {/* Center circle */}
            <circle
              cx="100"
              cy="90"
              r="4"
              fill="#0D1117"
            />
          </svg>

          {/* Zone markers */}
          <div className="absolute bottom-0 left-0 text-xs text-loss font-medium">0</div>
          <div className="absolute bottom-0 right-0 text-xs text-profit font-medium">100</div>
        </div>

        {/* Value Display */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 bg-gray-900/50 border border-white/5 rounded-lg px-6 py-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Strength Score</p>
              <p className="text-3xl font-bold text-white">{strengthValue}</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Status</p>
              <p className={`text-lg font-bold ${
                strengthValue >= 70 ? 'text-profit' :
                strengthValue >= 40 ? 'text-yellow-500' :
                'text-loss'
              }`}>
                {strengthLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Zone Legend */}
        <div className="w-full grid grid-cols-3 gap-2">
          {zones.map((zone) => (
            <div
              key={zone.label}
              className="bg-gray-900/50 border border-white/5 rounded-lg p-2 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: zone.color }}
                />
                <p className="text-xs font-medium text-white">{zone.label}</p>
              </div>
              <p className="text-xs text-gray-500">{zone.range}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

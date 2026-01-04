import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedCounter from '../components/AnimatedCounter';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  AlertTriangle,
  ChevronDown,
  RefreshCw,
  Settings,
  Download,
  Upload,
  Zap,
  Target,
  BarChart3,
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [tradeType, setTradeType] = useState('market');
  const [quantity, setQuantity] = useState(1.0);
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const chartContainerRef = useRef();
  const chartRef = useRef();

  // Mock trading data
  const [accountStats, setAccountStats] = useState({
    equity: 50000,
    realizedPnL: 2450.50,
    dailyDrawdown: 1.2,
    totalDrawdown: 3.8,
    winRate: 68.5,
    totalTrades: 147,
  });

  const [aiSignals, setAiSignals] = useState([
    {
      id: 1,
      symbol: 'EUR/USD',
      signal: 'BUY',
      confidence: 92,
      entry: 1.0875,
      stopLoss: 1.0825,
      takeProfit: 1.0950,
      timestamp: '2 min ago',
    },
    {
      id: 2,
      symbol: 'GBP/USD',
      signal: 'SELL',
      confidence: 87,
      entry: 1.2650,
      stopLoss: 1.2700,
      takeProfit: 1.2575,
      timestamp: '5 min ago',
    },
    {
      id: 3,
      symbol: 'BTC/USD',
      signal: 'HOLD',
      confidence: 75,
      entry: 43250,
      stopLoss: null,
      takeProfit: null,
      timestamp: '8 min ago',
    },
  ]);

  const [recentTrades, setRecentTrades] = useState([
    { id: 1, symbol: 'EUR/USD', type: 'BUY', quantity: 1.5, entry: 1.0850, current: 1.0875, pnl: 37.5, status: 'open' },
    { id: 2, symbol: 'GBP/USD', type: 'SELL', quantity: 1.0, entry: 1.2680, current: 1.2650, pnl: 30.0, status: 'open' },
    { id: 3, symbol: 'USD/JPY', type: 'BUY', quantity: 2.0, entry: 149.50, current: 149.85, pnl: 70.0, status: 'closed' },
  ]);

  const symbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD', 'ETH/USD', 'GOLD', 'OIL'];
  const timeframes = ['1M', '5M', '15M', '30M', '1H', '4H', '1D', '1W'];

  // Initialize TradingView Lightweight Charts
  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: { color: '#1F2937' },
          textColor: '#9CA3AF',
        },
        grid: {
          vertLines: { color: '#374151' },
          horzLines: { color: '#374151' },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: '#374151',
        },
        timeScale: {
          borderColor: '#374151',
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#00FF7F',
        downColor: '#EF4444',
        borderVisible: false,
        wickUpColor: '#00FF7F',
        wickDownColor: '#EF4444',
      });

      // Generate mock candlestick data
      const generateData = () => {
        const data = [];
        let time = Math.floor(Date.now() / 1000) - 86400 * 30; // 30 days ago
        let price = 1.0800;

        for (let i = 0; i < 200; i++) {
          time += 3600; // 1 hour
          const change = (Math.random() - 0.5) * 0.0020;
          const open = price;
          const close = price + change;
          const high = Math.max(open, close) + Math.random() * 0.0010;
          const low = Math.min(open, close) - Math.random() * 0.0010;

          data.push({ time, open, high, low, close });
          price = close;
        }
        return data;
      };

      candlestickSeries.setData(generateData());
      chartRef.current = chart;

      // Handle resize
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    }
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update account stats with small random changes
      setAccountStats(prev => ({
        ...prev,
        equity: prev.equity + (Math.random() - 0.5) * 100,
        realizedPnL: prev.realizedPnL + (Math.random() - 0.5) * 50,
        dailyDrawdown: Math.max(0, prev.dailyDrawdown + (Math.random() - 0.5) * 0.2),
      }));

      // Update recent trades PnL
      setRecentTrades(prev =>
        prev.map(trade => ({
          ...trade,
          pnl: trade.pnl + (Math.random() - 0.5) * 5,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleBuy = () => {
    console.log('Buy order:', { symbol: selectedSymbol, quantity, stopLoss, takeProfit });
    // Implement buy logic
  };

  const handleSell = () => {
    console.log('Sell order:', { symbol: selectedSymbol, quantity, stopLoss, takeProfit });
    // Implement sell logic
  };

  const getSignalBadgeClass = (signal) => {
    if (signal === 'BUY') return 'badge-buy';
    if (signal === 'SELL') return 'badge-sell';
    return 'badge-hold';
  };

  return (
    <div className="min-h-screen bg-dark-primary flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-60' : 'md:ml-20'}`}>
        {/* Navbar */}
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} isMenuOpen={sidebarOpen} />

        {/* Dashboard Content */}
        <main className="pt-20 p-6">
          {/* Account Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <AnimatedCard delay={0} className="p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  onClick={handleRefresh}
                  className="text-gray-400 hover:text-green-primary transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </motion.button>
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Total Equity</h3>
              <AnimatedCounter
                value={accountStats.equity}
                prefix="$"
                decimals={2}
                className="text-3xl font-bold text-gray-100"
              />
              <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +5.2% this month
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.1} className="p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Realized PnL</h3>
              <AnimatedCounter
                value={accountStats.realizedPnL}
                prefix="$"
                decimals={2}
                color="auto"
                className="text-3xl font-bold"
              />
              <p className="text-sm text-gray-400 mt-2">
                Win Rate: <span className="text-green-400 font-semibold">{accountStats.winRate}%</span>
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Daily Drawdown</h3>
              <AnimatedCounter
                value={accountStats.dailyDrawdown}
                suffix="%"
                decimals={2}
                className="text-3xl font-bold text-yellow-400"
              />
              <p className="text-sm text-gray-400 mt-2">
                Max: <span className="text-red-400 font-semibold">5.0%</span>
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Total Drawdown</h3>
              <AnimatedCounter
                value={accountStats.totalDrawdown}
                suffix="%"
                decimals={2}
                className="text-3xl font-bold text-purple-400"
              />
              <p className="text-sm text-gray-400 mt-2">
                Trades: <span className="text-gray-100 font-semibold">{accountStats.totalTrades}</span>
              </p>
            </AnimatedCard>
          </div>

          {/* Main Trading Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2">
              <AnimatedCard delay={0.4} className="p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
                {/* Chart Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <select
                        value={selectedSymbol}
                        onChange={(e) => setSelectedSymbol(e.target.value)}
                        className="appearance-none bg-dark-primary border border-dark-tertiary text-gray-100 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:border-green-primary cursor-pointer"
                      >
                        {symbols.map((symbol) => (
                          <option key={symbol} value={symbol}>
                            {symbol}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-1 bg-dark-primary rounded-lg p-1">
                      {timeframes.map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setSelectedTimeframe(tf)}
                          className={`px-3 py-1 text-sm rounded transition-all duration-300 ${
                            selectedTimeframe === tf
                              ? 'bg-gradient-green text-dark-primary font-semibold'
                              : 'text-gray-400 hover:text-green-primary'
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-dark-primary border border-dark-tertiary rounded-lg text-gray-400 hover:text-green-primary transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-dark-primary border border-dark-tertiary rounded-lg text-gray-400 hover:text-green-primary transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Chart */}
                <div ref={chartContainerRef} className="chart-container rounded-lg" />

                {/* Chart Info */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                      Open: <span className="text-gray-100 font-semibold">1.0850</span>
                    </span>
                    <span className="text-gray-400">
                      High: <span className="text-green-400 font-semibold">1.0880</span>
                    </span>
                    <span className="text-gray-400">
                      Low: <span className="text-red-400 font-semibold">1.0845</span>
                    </span>
                    <span className="text-gray-400">
                      Close: <span className="text-gray-100 font-semibold">1.0875</span>
                    </span>
                  </div>
                  <div className="text-gray-400">
                    Volume: <span className="text-gray-100 font-semibold">1.2M</span>
                  </div>
                </div>
              </AnimatedCard>

              {/* Recent Trades */}
              <AnimatedCard delay={0.6} className="mt-6 p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Recent Trades</h3>
                  <button className="text-sm text-green-primary hover:text-green-secondary transition-colors">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-tertiary text-gray-400 text-sm">
                        <th className="text-left py-3">Symbol</th>
                        <th className="text-left py-3">Type</th>
                        <th className="text-right py-3">Quantity</th>
                        <th className="text-right py-3">Entry</th>
                        <th className="text-right py-3">Current</th>
                        <th className="text-right py-3">PnL</th>
                        <th className="text-center py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrades.map((trade, index) => (
                        <motion.tr
                          key={trade.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-dark-tertiary hover:bg-dark-primary transition-colors"
                        >
                          <td className="py-4 text-gray-100 font-semibold">{trade.symbol}</td>
                          <td className="py-4">
                            <span className={trade.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>
                              {trade.type}
                            </span>
                          </td>
                          <td className="py-4 text-right text-gray-300">{trade.quantity}</td>
                          <td className="py-4 text-right text-gray-300">{trade.entry}</td>
                          <td className="py-4 text-right text-gray-300">{trade.current.toFixed(4)}</td>
                          <td className={`py-4 text-right font-semibold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                          </td>
                          <td className="py-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              trade.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {trade.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedCard>
            </div>

            {/* Right Panel - Trading Controls */}
            <div className="space-y-6">
              {/* Trade Controls */}
              <AnimatedCard delay={0.5} className="p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
                <h3 className="text-xl font-bold mb-6">Trade Controls</h3>

                {/* Order Type */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Order Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTradeType('market')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                        tradeType === 'market'
                          ? 'bg-gradient-green text-dark-primary'
                          : 'bg-dark-primary text-gray-400 hover:text-green-primary'
                      }`}
                    >
                      Market
                    </button>
                    <button
                      onClick={() => setTradeType('limit')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                        tradeType === 'limit'
                          ? 'bg-gradient-green text-dark-primary'
                          : 'bg-dark-primary text-gray-400 hover:text-green-primary'
                      }`}
                    >
                      Limit
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Quantity (Lots)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    step="0.1"
                    min="0.1"
                    className="input-base"
                  />
                </div>

                {/* Stop Loss */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Stop Loss</label>
                  <input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    step="0.0001"
                    placeholder="Optional"
                    className="input-base"
                  />
                </div>

                {/* Take Profit */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Take Profit</label>
                  <input
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    step="0.0001"
                    placeholder="Optional"
                    className="input-base"
                  />
                </div>

                {/* Buy/Sell Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <AnimatedButton
                    variant="success"
                    fullWidth
                    onClick={handleBuy}
                    icon={<TrendingUp className="w-5 h-5" />}
                  >
                    Buy
                  </AnimatedButton>
                  <AnimatedButton
                    variant="danger"
                    fullWidth
                    onClick={handleSell}
                    icon={<TrendingDown className="w-5 h-5" />}
                  >
                    Sell
                  </AnimatedButton>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-4 border-t border-dark-tertiary">
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-2 bg-dark-primary border border-dark-tertiary rounded-lg text-xs text-gray-400 hover:text-green-primary transition-colors"
                    >
                      <Upload className="w-4 h-4 mx-auto mb-1" />
                      Close All
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-2 bg-dark-primary border border-dark-tertiary rounded-lg text-xs text-gray-400 hover:text-green-primary transition-colors"
                    >
                      <Target className="w-4 h-4 mx-auto mb-1" />
                      Auto SL/TP
                    </motion.button>
                  </div>
                </div>
              </AnimatedCard>

              {/* AI Signals */}
              <AnimatedCard delay={0.6} className="p-6 bg-dark-secondary border border-dark-tertiary rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-primary" />
                    <h3 className="text-xl font-bold">AI Signals</h3>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  {aiSignals.map((signal, index) => (
                    <motion.div
                      key={signal.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-dark-primary border border-dark-tertiary rounded-lg hover:border-green-primary/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-100">{signal.symbol}</span>
                        <span className={getSignalBadgeClass(signal.signal)}>
                          {signal.signal}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Confidence</span>
                        <span className="text-green-400 font-semibold">{signal.confidence}%</span>
                      </div>
                      <div className="w-full bg-dark-tertiary rounded-full h-1.5 mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${signal.confidence}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gradient-green h-1.5 rounded-full"
                        />
                      </div>
                      {signal.signal !== 'HOLD' && (
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Entry</span>
                            <p className="text-gray-100 font-semibold">{signal.entry}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">SL</span>
                            <p className="text-red-400 font-semibold">{signal.stopLoss}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">TP</span>
                            <p className="text-green-400 font-semibold">{signal.takeProfit}</p>
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{signal.timestamp}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 bg-dark-primary border border-green-primary/30 rounded-lg text-sm text-green-primary hover:bg-green-primary/10 transition-colors"
                >
                  View All Signals
                </motion.button>
              </AnimatedCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

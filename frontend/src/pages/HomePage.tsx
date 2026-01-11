import { Link } from "react-router-dom";
import { LandingLayout } from "@/components/layout";
import {
  Button,
  Card,
  Orb,
  TextType,
  MagicBento,
  MiniChart,
} from "@/components/ui";
import {
  TrendingUp,
  Shield,
  Award,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  Bot,
  ShieldCheck,
  Trophy,
  LineChart,
  Gauge,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";

// Generate random chart data for demo
const generateChartData = (basePrice: number, points: number = 20) => {
  const data: number[] = [];
  let price = basePrice;
  for (let i = 0; i < points; i++) {
    price = price * (1 + (Math.random() - 0.48) * 0.05);
    data.push(price);
  }
  return data;
};

export default function HomePage() {
  const features = [
    {
      icon: <Bot className="w-5 h-5" />,
      title: "AI-Powered Trading",
      description:
        "Advanced AI algorithms analyze markets in real-time to provide you with the best trading opportunities.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Risk Management",
      description:
        "Comprehensive risk management tools to protect your capital and maximize returns.",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Funded Challenges",
      description:
        "Prove your skills and get access to funded trading accounts with competitive profit splits.",
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      title: "Advanced Analytics",
      description:
        "Detailed analytics and performance metrics to track and improve your trading strategy.",
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      title: "Real-Time Execution",
      description:
        "Lightning-fast trade execution with institutional-grade infrastructure.",
    },
    {
      icon: <UsersRound className="w-5 h-5" />,
      title: "Community & Leaderboard",
      description:
        "Join a community of traders and compete on global leaderboards.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Active Traders" },
    { value: "$50M+", label: "Total Volume" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  const pricingPlans = [
    {
      name: "Demo",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Virtual trading account",
        "Real-time market data",
        "Basic analytics",
        "Community access",
      ],
    },
    {
      name: "Challenge",
      price: "$99",
      description: "Prove your trading skills",
      features: [
        "Everything in Demo",
        "$10,000 challenge account",
        "Advanced analytics",
        "Priority support",
        "Get funded on success",
      ],
      popular: true,
    },
    {
      name: "Pro",
      price: "$299",
      description: "For professional traders",
      features: [
        "Everything in Challenge",
        "$50,000 challenge account",
        "AI trading signals",
        "Custom risk parameters",
        "80% profit split",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <LandingLayout>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
      >
        {/* Animated Orb Background */}
        <Orb />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-purple/20 border border-purple/30 text-purple-300 text-sm font-medium mb-6">
              ⚡ Powered by AI - Trusted by 10,000+ Traders
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">Trade Smarter with</span>
            <br />
            <TextType
              words={[
                "AI-Powered Insights",
                "Real-Time Data",
                "Smart Analytics",
                "Advanced Algorithms",
              ]}
              className="text-primary font-extrabold"
            />
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Join the next generation of prop trading. Get funded, trade with
            confidence, and keep up to 80% of your profits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/register">
              <Button variant="primary" size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-profit" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-profit" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                variant="glass"
                padding="md"
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-1.5">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400/80 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Forex Market Section */}
      <section id="market" className="py-20 px-6 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                Global Markets
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Trade the World's Largest Financial Market
              </h2>
              <p className="text-lg text-gray-400/90 mb-6 leading-relaxed">
                The Foreign Exchange (Forex) market is the world's most liquid
                financial market, with over{" "}
                <span className="text-primary font-bold">$7.5 trillion</span>{" "}
                traded daily. Access major, minor, and exotic currency pairs
                24/5 with institutional-grade execution.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-white/5">
                  <div className="text-2xl font-bold text-primary mb-1">
                    $7.5T
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Daily Volume
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-white/5">
                  <div className="text-2xl font-bold text-primary mb-1">
                    24/5
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Trading Hours
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-white/5">
                  <div className="text-2xl font-bold text-primary mb-1">
                    50+
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Currency Pairs
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-white/5">
                  <div className="text-2xl font-bold text-primary mb-1">
                    0.1s
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Execution Speed
                  </div>
                </div>
              </div>
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Start Trading Forex
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Image/Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-white/5 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple/5" />
                <div className="relative z-10">
                  <svg viewBox="0 0 400 300" className="w-full h-auto">
                    {/* Background grid */}
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="rgba(199, 255, 0, 0.1)"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="400" height="300" fill="url(#grid)" />

                    {/* Forex candlestick chart */}
                    {[
                      {
                        x: 40,
                        open: 150,
                        close: 180,
                        high: 190,
                        low: 140,
                        color: "#10B981",
                      },
                      {
                        x: 80,
                        open: 180,
                        close: 160,
                        high: 185,
                        low: 155,
                        color: "#EF4444",
                      },
                      {
                        x: 120,
                        open: 160,
                        close: 190,
                        high: 200,
                        low: 155,
                        color: "#10B981",
                      },
                      {
                        x: 160,
                        open: 190,
                        close: 170,
                        high: 195,
                        low: 165,
                        color: "#EF4444",
                      },
                      {
                        x: 200,
                        open: 170,
                        close: 200,
                        high: 210,
                        low: 165,
                        color: "#10B981",
                      },
                      {
                        x: 240,
                        open: 200,
                        close: 185,
                        high: 205,
                        low: 180,
                        color: "#EF4444",
                      },
                      {
                        x: 280,
                        open: 185,
                        close: 210,
                        high: 220,
                        low: 180,
                        color: "#10B981",
                      },
                      {
                        x: 320,
                        open: 210,
                        close: 230,
                        high: 240,
                        low: 205,
                        color: "#10B981",
                      },
                    ].map((candle, i) => (
                      <g key={i}>
                        <line
                          x1={candle.x}
                          y1={candle.high}
                          x2={candle.x}
                          y2={candle.low}
                          stroke={candle.color}
                          strokeWidth="1"
                          opacity="0.8"
                        />
                        <rect
                          x={candle.x - 8}
                          y={Math.min(candle.open, candle.close)}
                          width="16"
                          height={Math.abs(candle.close - candle.open)}
                          fill={candle.color}
                          opacity="0.9"
                        />
                      </g>
                    ))}

                    {/* Currency pairs */}
                    <text
                      x="20"
                      y="30"
                      fill="#C7FF00"
                      fontSize="16"
                      fontWeight="bold"
                    >
                      EUR/USD
                    </text>
                    <text x="20" y="50" fill="#10B981" fontSize="12">
                      1.0856 ↑ +0.24%
                    </text>
                  </svg>
                </div>
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-gray-900/80 backdrop-blur-xl border border-primary/20 shadow-xl">
                <div className="text-xs text-gray-400 mb-1">Live Spread</div>
                <div className="text-lg font-bold text-primary">0.8 pips</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casablanca Stock Exchange Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Visual - Left side */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-white/5 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-primary/5" />
                <div className="relative z-10">
                  {/* Morocco flag colors accent */}
                  <div className="flex gap-2 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">
                        Casablanca Stock Exchange
                      </div>
                      <div className="text-xs text-gray-400">MASI Index</div>
                    </div>
                  </div>

                  {/* Stock list */}
                  <div className="space-y-3">
                    {[
                      {
                        name: "Attijariwafa Bank",
                        ticker: "ATW",
                        price: "455.00",
                        change: "+1.2%",
                        positive: true,
                      },
                      {
                        name: "Maroc Telecom",
                        ticker: "IAM",
                        price: "142.50",
                        change: "+0.8%",
                        positive: true,
                      },
                      {
                        name: "BMCE Bank",
                        ticker: "BCP",
                        price: "248.00",
                        change: "-0.3%",
                        positive: false,
                      },
                      {
                        name: "LafargeHolcim",
                        ticker: "LHM",
                        price: "1850.00",
                        change: "+2.1%",
                        positive: true,
                      },
                    ].map((stock, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-900/40 backdrop-blur-xl border border-white/5 hover:border-primary/20 transition-all"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white">
                            {stock.ticker}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stock.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">
                            {stock.price} MAD
                          </div>
                          <div
                            className={`text-xs font-medium ${stock.positive ? "text-profit" : "text-loss"}`}
                          >
                            {stock.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* MASI Index chart */}
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400">
                        MASI All Shares
                      </span>
                      <span className="text-sm font-bold text-profit">
                        +12,456.78
                      </span>
                    </div>
                    <svg viewBox="0 0 300 80" className="w-full">
                      <path
                        d="M 0 60 Q 50 40, 75 45 T 150 35 Q 200 25, 225 30 T 300 20"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                      <path
                        d="M 0 60 Q 50 40, 75 45 T 150 35 Q 200 25, 225 30 T 300 20 L 300 80 L 0 80 Z"
                        fill="url(#gradient-green)"
                        opacity="0.2"
                      />
                      <defs>
                        <linearGradient
                          id="gradient-green"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#10B981"
                            stopOpacity="0.4"
                          />
                          <stop
                            offset="100%"
                            stopColor="#10B981"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Right side */}
            <div className="order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-xs font-bold uppercase tracking-wider mb-6">
                African Markets
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Access Morocco's Leading Stock Exchange
              </h2>
              <p className="text-lg text-gray-400/90 mb-6 leading-relaxed">
                The Casablanca Stock Exchange (Bourse de Casablanca) is Africa's
                third-largest stock exchange by market capitalization. Trade
                blue-chip Moroccan companies and diversify your portfolio with
                North African equities.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-profit mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-white">75+ Listed Companies</strong>{" "}
                    across banking, telecom, real estate, and manufacturing
                    sectors
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-profit mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-white">MASI & MADEX Indices</strong>{" "}
                    track market performance and sectoral trends
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-profit mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">
                    <strong className="text-white">
                      Emerging Market Access
                    </strong>{" "}
                    with competitive trading fees and regulatory oversight
                  </span>
                </li>
              </ul>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Explore African Markets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Analytics Section */}
      <section className="py-20 px-6 bg-gray-900/20 relative overflow-hidden">
        {/* Background globe effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <motion.div
            className="w-[600px] h-[600px] rounded-full border-2 border-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full border border-primary/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              Powered by Data
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Data-Driven Trading Intelligence
            </h2>
            <p className="text-lg text-gray-400/90 max-w-3xl mx-auto leading-relaxed">
              In modern financial markets, data is the ultimate edge. Our
              platform processes millions of data points per second to deliver
              real-time insights, predictive analytics, and AI-powered trading
              signals.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-gray-900/40 backdrop-blur-2xl border border-white/5 hover:border-primary/20 transition-all">
              <BarChart3 className="w-10 h-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-white mb-2">1M+</div>
              <div className="text-sm text-gray-400 mb-3">
                Data Points Per Second
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Real-time market data aggregation from global exchanges, news
                feeds, and social sentiment
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900/40 backdrop-blur-2xl border border-white/5 hover:border-primary/20 transition-all">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-white mb-2">50ms</div>
              <div className="text-sm text-gray-400 mb-3">Latency</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ultra-low latency infrastructure ensures your orders execute at
                lightning speed
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900/40 backdrop-blur-2xl border border-white/5 hover:border-primary/20 transition-all">
              <Bot className="w-10 h-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-sm text-gray-400 mb-3">AI Accuracy</div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Machine learning models trained on decades of historical data
                for predictive analysis
              </p>
            </div>
          </div>

          {/* Data Flow Visualization */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Data sources */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                The Power of Real-Time Data
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <TrendingUp className="w-5 h-5" />,
                    title: "Market Data Feeds",
                    desc: "Level 2 order book data, tick-by-tick prices, volume analysis",
                  },
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    title: "Technical Indicators",
                    desc: "RSI, MACD, Bollinger Bands, Fibonacci levels, and 100+ indicators",
                  },
                  {
                    icon: <Bot className="w-5 h-5" />,
                    title: "AI Pattern Recognition",
                    desc: "Neural networks identify chart patterns, support/resistance levels",
                  },
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: "Sentiment Analysis",
                    desc: "News sentiment, social media trends, market psychology metrics",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start p-4 rounded-xl bg-gray-900/30 backdrop-blur-xl border border-white/5 hover:border-primary/20 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual chart */}
            <div className="relative">
              <div className="p-8 rounded-2xl bg-gray-900/40 backdrop-blur-2xl border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">
                      Live Analytics Dashboard
                    </div>
                    <div className="text-lg font-bold text-white">BTC/USD</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-profit">
                      $43,250
                    </div>
                    <div className="text-xs text-profit">+2.4% (24h)</div>
                  </div>
                </div>

                {/* Mini chart visualization */}
                <svg viewBox="0 0 400 200" className="w-full">
                  {/* Grid */}
                  <defs>
                    <linearGradient
                      id="chart-gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#C7FF00" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C7FF00" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 50, 100, 150, 200].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Area chart */}
                  <path
                    d="M 0 150 Q 50 120, 100 130 T 200 100 Q 250 80, 300 90 T 400 70"
                    fill="none"
                    stroke="#C7FF00"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 150 Q 50 120, 100 130 T 200 100 Q 250 80, 300 90 T 400 70 L 400 200 L 0 200 Z"
                    fill="url(#chart-gradient)"
                  />

                  {/* Data points */}
                  {[
                    { x: 100, y: 130 },
                    { x: 200, y: 100 },
                    { x: 300, y: 90 },
                    { x: 400, y: 70 },
                  ].map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="#C7FF00"
                    />
                  ))}
                </svg>

                {/* Indicator badges */}
                <div className="flex gap-2 mt-6">
                  <div className="px-3 py-1 rounded-full bg-profit/10 border border-profit/20 text-profit text-xs font-bold">
                    RSI: 65
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                    MACD: Bullish
                  </div>
                  <div className="px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-xs font-bold">
                    Vol: High
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-4 leading-tight">
              Powerful Features for
              <br />
              Smarter Trading
            </h2>
            <p className="text-base text-gray-400/80 max-w-2xl mx-auto">
              Everything you need to trade like a professional
            </p>
          </div>

          <MagicBento items={features} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-4 leading-tight">
              Choose Your Path to Success
            </h2>
            <p className="text-base text-gray-400/80 max-w-2xl mx-auto">
              Start free or go pro. All plans include our core trading features.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="relative pt-6">
                {plan.popular && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-2 bg-primary text-gray-900 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl">
                      Most Popular
                    </span>
                  </div>
                )}
                <div
                  className={`
                    relative overflow-hidden rounded-2xl p-6
                    bg-gray-900/30 backdrop-blur-2xl border flex flex-col h-full
                    ${plan.popular ? "border-primary/40 shadow-xl shadow-primary/10 lg:scale-105" : "border-white/5 shadow-lg shadow-black/10"}
                    hover:bg-gray-900/40 hover:border-primary/30 hover:-translate-y-1
                    transition-all duration-300
                  `}
                >
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-400/80">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-white">
                          {plan.price}
                        </span>
                        {plan.price !== "Free" && (
                          <span className="text-sm text-gray-400/80 ml-1">
                            /month
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="mb-8 space-y-3 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle2 className="mr-2.5 h-4 w-4 flex-shrink-0 text-profit mt-0.5" />
                          <span className="text-sm text-gray-300/90 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <div className="mt-auto">
                      <Link to="/register" className="block">
                        <Button
                          variant={plan.popular ? "primary" : "outline"}
                          className="w-full"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="elevated" padding="md">
            <h2 className="text-3xl font-bold text-white/90 mb-4">
              Your Edge in Crypto Trading
            </h2>
            <p className="text-base text-gray-400/80 mb-6">
              Join 10,000+ traders who trust our platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-gray-400/80">
              <span>✓ Next Level Security</span>
              <span>✓ Seamless Experience</span>
              <span>✓ Real-Time Alerts</span>
            </div>
          </Card>
        </div>
      </section>
    </LandingLayout>
  );
}

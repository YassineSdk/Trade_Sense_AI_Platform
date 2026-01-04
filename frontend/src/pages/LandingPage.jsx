import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedButton from "../components/AnimatedButton";
import { FaTwitter, FaDiscord, FaTelegram, FaLinkedin } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // Simple minimalistic SVG icons
  const AIIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );

  const ChartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <path
        d="M3 3v18h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 14l4-4 3 3 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="14" r="1.5" fill="currentColor" />
      <circle cx="11" cy="10" r="1.5" fill="currentColor" />
      <circle cx="14" cy="13" r="1.5" fill="currentColor" />
      <circle cx="19" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );

  const BellIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const features = [
    {
      icon: AIIcon,
      title: "AI Signals",
      description:
        "Machine learning algorithms analyze market patterns in real-time.",
    },
    {
      icon: ChartIcon,
      title: "Live Data",
      description:
        "Access real-time market data across Forex, Crypto, and Stocks.",
    },
    {
      icon: BellIcon,
      title: "Smart Alerts",
      description:
        "Instant notifications for trading opportunities and signals.",
    },
    {
      icon: ShieldIcon,
      title: "Risk Tools",
      description:
        "Built-in stop-loss, take-profit, and position sizing tools.",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "10K+", label: "Active Traders" },
    { value: "$5M+", label: "Daily Volume" },
    { value: "4.9/5", label: "User Rating" },
  ];

  const testimonials = [
    {
      name: "Michael Chen",
      role: "Professional Trader",
      text: "TradeSense AI has revolutionized my trading. The AI signals improved my win rate by 40%.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Forex Trader",
      text: "The real-time data and analytics are unmatched. Best platform I have used.",
      rating: 5,
    },
    {
      name: "David Martinez",
      role: "Crypto Investor",
      text: "The courses took my trading to the next level. Highly recommend.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for beginners",
      features: [
        "Basic AI Signals",
        "Real-time Data",
        "Email Support",
        "Community Access",
        "Mobile App",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "For serious traders",
      features: [
        "Advanced AI Signals",
        "Priority Data Feed",
        "24/7 Support",
        "All MasterClasses",
        "API Access",
        "Custom Alerts",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For institutions",
      features: [
        "Custom AI Models",
        "Dedicated Server",
        "White-label Solution",
        "Personal Account Manager",
        "Advanced Analytics",
        "Priority Support",
      ],
      popular: false,
    },
  ];

  // Features Carousel Component
  const FeaturesCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const detailedFeatures = [
      {
        title: "AI-Powered Signal Generation",
        description:
          "Our advanced machine learning algorithms analyze millions of data points in real-time to identify high-probability trading opportunities. Get instant notifications when the AI detects optimal entry and exit points.",
        icon: AIIcon,
        highlights: [
          "Real-time market analysis",
          "Pattern recognition algorithms",
          "95% signal accuracy rate",
          "Multi-timeframe analysis",
        ],
      },
      {
        title: "Advanced Risk Management",
        description:
          "Protect your capital with intelligent risk management tools. Our system automatically calculates optimal position sizes, stop-loss levels, and take-profit targets based on your risk tolerance.",
        icon: ShieldIcon,
        highlights: [
          "Automated position sizing",
          "Dynamic stop-loss placement",
          "Risk-reward optimization",
          "Portfolio diversification tools",
        ],
      },
      {
        title: "Real-Time Market Data",
        description:
          "Access live market data from multiple exchanges and markets including Forex, Crypto, and Stocks. Our ultra-low latency feeds ensure you never miss a trading opportunity.",
        icon: ChartIcon,
        highlights: [
          "Sub-millisecond latency",
          "Multi-market coverage",
          "Historical data access",
          "Custom indicators",
        ],
      },
      {
        title: "Smart Notification System",
        description:
          "Stay informed with intelligent alerts that notify you about important market events, signal updates, and portfolio changes. Customize your notification preferences for different assets and strategies.",
        icon: BellIcon,
        highlights: [
          "Instant push notifications",
          "Email & SMS alerts",
          "Custom alert rules",
          "Priority signal notifications",
        ],
      },
    ];

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % detailedFeatures.length);
    };

    const prevSlide = () => {
      setCurrentSlide(
        (prev) =>
          (prev - 1 + detailedFeatures.length) % detailedFeatures.length,
      );
    };

    return (
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-secondary/50 backdrop-blur-sm border border-dark-tertiary/50 rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 text-green-400">
                  {React.createElement(detailedFeatures[currentSlide].icon, {
                    className: "w-10 h-10",
                  })}
                </div>

                <h3 className="text-3xl font-bold mb-4 gradient-text">
                  {detailedFeatures[currentSlide].title}
                </h3>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {detailedFeatures[currentSlide].description}
                </p>

                <div className="space-y-3">
                  {detailedFeatures[currentSlide].highlights.map(
                    (highlight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        <span className="text-gray-400">{highlight}</span>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>

              {/* Right: Visual Placeholder */}
              <div className="relative h-80 bg-dark-primary/50 rounded-xl border border-dark-tertiary/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400">
                      {React.createElement(
                        detailedFeatures[currentSlide].icon,
                        { className: "w-12 h-12" },
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      Feature Visualization
                    </p>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-dark-secondary/50 border border-dark-tertiary/50 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/30 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {detailedFeatures.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? "bg-green-400 w-8"
                    : "bg-dark-tertiary hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-dark-secondary/50 border border-dark-tertiary/50 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/30 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Auto-advance indicator */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Feature {currentSlide + 1} of {detailedFeatures.length}
          </p>
        </div>
      </div>
    );
  };

  // Animated Line Graph Component
  const LineGraph = () => {
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const dataPoints = [
      { x: 0, y: 30, value: 1200 },
      { x: 100, y: 50, value: 1450 },
      { x: 200, y: 20, value: 1850 },
      { x: 300, y: 60, value: 2100 },
      { x: 400, y: 35, value: 2650 },
      { x: 500, y: 10, value: 3200 },
    ];

    return (
      <div className="relative w-full h-full min-h-[500px] bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-tertiary overflow-hidden">
        <div className="absolute top-4 left-6 z-10">
          <p className="text-sm text-gray-500">Portfolio Growth</p>
          <motion.p
            className="text-2xl font-bold text-green-400"
            key={hoveredPoint?.value}
          >
            ${hoveredPoint?.value || "3,200"}
          </motion.p>
        </div>

        <svg viewBox="0 0 500 100" className="w-full h-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="500"
              y2={y}
              stroke="#374151"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Area under curve */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FF7F" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00FF7F" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d={`M 0 30 L 100 50 L 200 20 L 300 60 L 400 35 L 500 10 L 500 100 L 0 100 Z`}
            fill="url(#lineGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Line */}
          <motion.path
            d={`M 0 30 L 100 50 L 200 20 L 300 60 L 400 35 L 500 10`}
            fill="none"
            stroke="#00FF7F"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <motion.g
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#00FF7F"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {hoveredPoint === point && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="none"
                  stroke="#00FF7F"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                />
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-primary text-gray-100 overflow-x-hidden">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-green rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-dark-primary"
              >
                <path
                  d="M3 3v18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 14l4-4 3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">TradeSense AI</h1>
              <p className="text-xs text-gray-500">Prop Trading</p>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-green-primary transition-colors text-sm"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-green-primary transition-colors text-sm"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-green-primary transition-colors text-sm"
            >
              Reviews
            </a>
          </div>

          <div className="flex items-center gap-4">
            <AnimatedButton
              variant="secondary"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </AnimatedButton>
            <AnimatedButton
              variant="primary"
              size="sm"
              onClick={() => navigate("/register")}
            >
              Get Started
            </AnimatedButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground density={100} opacity={0.4} />

        {/* Animated gradient orbs like contact section */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold">
                🚀 AI-Powered Trading Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Trade Smarter with{" "}
              <span className="gradient-text">AI-Powered</span>
              <br />
              Market Insights
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              Join thousands of traders using advanced AI algorithms to make
              data-driven decisions and maximize profits in real-time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => navigate("/register")}
              >
                Start Trading Now
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Watch Demo
              </AnimatedButton>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9 + index * 0.1,
                  }}
                  className="text-center"
                >
                  <h3 className="text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Line Graph */}
      <section
        id="features"
        ref={featuresRef}
        className="relative py-32 bg-dark-secondary"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for{" "}
              <span className="gradient-text">Modern Traders</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to succeed in the markets
            </p>
          </motion.div>

          {/* Features Grid with Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {features.map((feature, index) => (
                <AnimatedCard
                  key={index}
                  delay={index * 0.1}
                  className="p-6 bg-dark-primary/50 backdrop-blur-sm border border-dark-tertiary/50 rounded-xl hover:border-green-primary/30 transition-all flex flex-col"
                >
                  <div className="flex flex-col items-start h-full">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 text-green-400">
                      <feature.icon />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Right: Animated Line Graph */}
            <motion.div
              style={{ y, opacity }}
              className="h-full flex items-stretch"
            >
              <div className="w-full">
                <LineGraph />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Features Carousel Section */}
      <section className="relative py-32 bg-dark-primary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Explore</span> Our Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how TradeSense AI helps you trade smarter
            </p>
          </motion.div>

          <FeaturesCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-32 bg-dark-primary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See what our community has to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.2}
                className="p-6 bg-dark-secondary/50 backdrop-blur-sm border border-dark-tertiary/50 rounded-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-sm italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-green rounded-full flex items-center justify-center text-dark-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the plan that fits your trading needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.2}
                className={`p-8 rounded-xl ${
                  plan.popular
                    ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500"
                    : "bg-dark-primary/50 backdrop-blur-sm border border-dark-tertiary/50"
                }`}
              >
                {plan.popular && (
                  <div className="inline-block px-3 py-1 bg-gradient-green text-dark-primary rounded-full text-xs font-bold mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold gradient-text">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <AnimatedButton
                  variant={plan.popular ? "primary" : "secondary"}
                  fullWidth
                  className="mb-8"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </AnimatedButton>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-green-400 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-dark-primary overflow-hidden">
        <ParticleBackground density={60} opacity={0.2} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your
              Trading?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Join TradeSense AI today and start making smarter trading
              decisions
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => navigate("/register")}
              >
                Start Free Trial
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Login to Account
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-secondary border-t border-dark-tertiary py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-green rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 text-dark-primary"
                  >
                    <path
                      d="M3 3v18h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 14l4-4 3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold gradient-text">
                  TradeSense AI
                </h3>
              </div>
              <p className="text-gray-500 text-sm">
                AI-powered prop trading platform for modern traders.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 text-sm">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="#features"
                    className="hover:text-green-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-green-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 text-sm">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 text-sm">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-primary transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-dark-tertiary flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 TradeSense AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href="#"
                className="text-gray-500 hover:text-green-primary transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href="#"
                className="text-gray-500 hover:text-green-primary transition-colors"
              >
                <FaDiscord className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href="#"
                className="text-gray-500 hover:text-green-primary transition-colors"
              >
                <FaTelegram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href="#"
                className="text-gray-500 hover:text-green-primary transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-dark-primary/50 border border-dark-tertiary rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              <strong>Risk Disclaimer:</strong> Trading involves substantial
              risk of loss. Past performance is not indicative of future
              results. Always consult with a financial advisor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import { Link } from "react-router-dom";
import { LandingLayout } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import {
  TrendingUp,
  Shield,
  Award,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Trading",
      description:
        "Advanced AI algorithms analyze markets in real-time to provide you with the best trading opportunities.",
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description:
        "Comprehensive risk management tools to protect your capital and maximize returns.",
    },
    {
      icon: "🏆",
      title: "Funded Challenges",
      description:
        "Prove your skills and get access to funded trading accounts with competitive profit splits.",
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description:
        "Detailed analytics and performance metrics to track and improve your trading strategy.",
    },
    {
      icon: "⚡",
      title: "Real-Time Execution",
      description:
        "Lightning-fast trade execution with institutional-grade infrastructure.",
    },
    {
      icon: "👥",
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
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-purple/20 border border-purple/30 text-purple-300 text-sm font-medium mb-6">
              ⚡ Powered by AI - Trusted by 10,000+ Traders
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Trade Smarter with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple">
              AI-Powered Insights
            </span>
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
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                variant="glass"
                padding="lg"
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for
              <br />
              Smarter Trading
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to trade like a professional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                variant="glass"
                padding="lg"
                hover
                className="text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Path to Success
            </h2>
            <p className="text-xl text-gray-400">
              Start free or go pro. All plans include our core trading features.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                variant={plan.popular ? "elevated" : "glass"}
                padding="lg"
                className={`relative ${plan.popular ? "border-2 border-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-primary text-gray-900 rounded-full text-xs font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Free" && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 flex-shrink-0 text-profit" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register" className="block">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Market Performance */}
      <section id="market" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Live Market Performance
          </h2>

          <Card variant="glass" padding="md">
            <div className="overflow-x-auto">
              <div className="flex gap-4 pb-4">
                {[
                  { symbol: "BTC", name: "Bitcoin", price: 43250, change: 2.4 },
                  {
                    symbol: "ETH",
                    name: "Ethereum",
                    price: 2890,
                    change: -1.2,
                  },
                  { symbol: "SOL", name: "Solana", price: 98.5, change: 5.7 },
                  { symbol: "ADA", name: "Cardano", price: 0.58, change: 3.2 },
                ].map((market, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-48 p-4 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple" />
                      <div>
                        <div className="font-semibold text-white">
                          {market.symbol}
                        </div>
                        <div className="text-xs text-gray-500">
                          {market.name}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-white text-lg">
                      ${market.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-sm ${market.change >= 0 ? "text-profit" : "text-loss"}`}
                    >
                      {market.change >= 0 ? "+" : ""}
                      {market.change}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card variant="elevated" padding="lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Your Edge in Crypto Trading
            </h2>
            <p className="text-xl text-gray-400 mb-8">
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
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

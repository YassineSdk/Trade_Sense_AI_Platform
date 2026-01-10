import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Shield,
  Award,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Trading',
      description: 'Advanced AI algorithms analyze markets in real-time to provide you with the best trading opportunities.',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Comprehensive risk management tools to protect your capital and maximize returns.',
    },
    {
      icon: Award,
      title: 'Funded Challenges',
      description: 'Prove your skills and get access to funded trading accounts with competitive profit splits.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed analytics and performance metrics to track and improve your trading strategy.',
    },
    {
      icon: Zap,
      title: 'Real-Time Execution',
      description: 'Lightning-fast trade execution with institutional-grade infrastructure.',
    },
    {
      icon: Users,
      title: 'Community & Leaderboard',
      description: 'Join a community of traders and compete on global leaderboards.',
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Active Traders' },
    { value: '$50M+', label: 'Total Volume' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ]

  const pricingPlans = [
    {
      name: 'Demo',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Virtual trading account',
        'Real-time market data',
        'Basic analytics',
        'Community access',
      ],
    },
    {
      name: 'Challenge',
      price: '$99',
      description: 'Prove your trading skills',
      features: [
        'Everything in Demo',
        '$10,000 challenge account',
        'Advanced analytics',
        'Priority support',
        'Get funded on success',
      ],
      popular: true,
    },
    {
      name: 'Pro',
      price: '$299',
      description: 'For professional traders',
      features: [
        'Everything in Challenge',
        '$50,000 challenge account',
        'AI trading signals',
        'Custom risk parameters',
        '80% profit split',
        'Dedicated account manager',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container-custom relative py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4" />
              <span>Trusted by 10,000+ traders worldwide</span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Trade Smarter with{' '}
              <span className="block text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text">
                AI-Powered Insights
              </span>
            </h1>

            <p className="mb-10 text-xl text-primary-100 sm:text-2xl">
              Join the next generation of prop trading. Get funded, trade with confidence,
              and keep up to 80% of your profits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn btn-primary bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="btn bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-primary-100">
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-success-300" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-success-300" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-200 bg-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600">
              Professional trading tools and resources designed to help you reach your goals
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group card hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Choose Your Path to Success
            </h2>
            <p className="text-lg text-gray-600">
              Start free or go pro. All plans include our core trading features.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card relative ${
                  plan.popular
                    ? 'border-2 border-primary-500 shadow-xl'
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge bg-primary-600 text-white px-4 py-1.5 text-xs font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.price !== 'Free' && (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle2 className="mr-3 h-5 w-5 flex-shrink-0 text-success-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`btn w-full ${
                    plan.popular
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20 text-white">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Start Trading?
          </h2>
          <p className="mb-8 text-xl text-primary-100">
            Join thousands of traders already using TradeSense AI
          </p>
          <Link
            to="/register"
            className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl inline-flex items-center"
          >
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-4 flex items-center">
                <TrendingUp className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900">TradeSense AI</span>
              </div>
              <p className="text-gray-600">
                Empowering traders with AI-powered insights and professional-grade tools.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/" className="hover:text-primary-600">Features</Link></li>
                <li><Link to="/" className="hover:text-primary-600">Pricing</Link></li>
                <li><Link to="/" className="hover:text-primary-600">Challenges</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/" className="hover:text-primary-600">About</Link></li>
                <li><Link to="/" className="hover:text-primary-600">Contact</Link></li>
                <li><Link to="/" className="hover:text-primary-600">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2024 TradeSense AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

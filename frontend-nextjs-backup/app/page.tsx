import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-xl font-bold text-white">TS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              TradeSense AI
            </span>
          </div>
          <nav className="hidden space-x-6 md:flex">
            <Link
              href="#features"
              className="text-gray-600 transition-colors hover:text-primary-600"
            >
              Features
            </Link>
            <Link
              href="#challenges"
              className="text-gray-600 transition-colors hover:text-primary-600"
            >
              Challenges
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 transition-colors hover:text-primary-600"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-gray-600 transition-colors hover:text-primary-600"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-gray-600 transition-colors hover:text-primary-600"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                Master Prop Trading with{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  AI-Powered Insights
                </span>
              </h1>
              <p className="mb-8 text-xl text-gray-600">
                Join thousands of traders on the most advanced prop trading
                platform. Get funded, trade with confidence, and scale your
                success with real-time AI signals and comprehensive analytics.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/auth/register"
                  className="w-full rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-700 sm:w-auto"
                >
                  Start Your Challenge
                </Link>
                <Link
                  href="#features"
                  className="w-full rounded-lg border-2 border-primary-600 px-8 py-4 text-lg font-semibold text-primary-600 transition-colors hover:bg-primary-50 sm:w-auto"
                >
                  Learn More
                </Link>
              </div>
              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-success-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-success-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Instant Funding</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-success-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary-600">
                  $250M+
                </div>
                <div className="text-gray-600">Total Funded</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary-600">
                  15K+
                </div>
                <div className="text-gray-600">Active Traders</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary-600">
                  98%
                </div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary-600">
                  24/7
                </div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                Why Choose TradeSense AI?
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to succeed in prop trading
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                  <svg
                    className="h-6 w-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  AI-Powered Signals
                </h3>
                <p className="text-gray-600">
                  Get real-time trading signals powered by advanced machine
                  learning algorithms analyzing market patterns 24/7.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-success-100">
                  <svg
                    className="h-6 w-6 text-success-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Real-Time Analytics
                </h3>
                <p className="text-gray-600">
                  Track your performance with comprehensive analytics,
                  risk metrics, and detailed trade history in real-time.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
                  <svg
                    className="h-6 w-6 text-secondary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Flexible Funding
                </h3>
                <p className="text-gray-600">
                  Choose from multiple challenge sizes and get funded up to
                  $200K with competitive profit splits up to 90%.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-warning-100">
                  <svg
                    className="h-6 w-6 text-warning-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Instant Execution
                </h3>
                <p className="text-gray-600">
                  Execute trades with lightning-fast speed and minimal
                  slippage through our optimized infrastructure.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-danger-100">
                  <svg
                    className="h-6 w-6 text-danger-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Risk Management
                </h3>
                <p className="text-gray-600">
                  Advanced risk management tools to protect your capital with
                  automated stop-loss and position sizing.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                  <svg
                    className="h-6 w-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Global Community
                </h3>
                <p className="text-gray-600">
                  Join a thriving community of traders, share strategies, and
                  compete on the global leaderboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Ready to Start Trading?
            </h2>
            <p className="mb-8 text-xl text-primary-100">
              Join thousands of successful traders on TradeSense AI Platform
            </p>
            <Link
              href="/auth/register"
              className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 transition-colors hover:bg-gray-100"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
                  <span className="text-sm font-bold text-white">TS</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  TradeSense AI
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Professional prop trading platform with AI-powered insights and
                real-time analytics.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Risk Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} TradeSense AI Platform. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

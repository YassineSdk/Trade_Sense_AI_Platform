import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  Button,
  Card,
  PriceDisplay,
  Input,
  SearchInput,
  TradingInput,
  MarketPair,
  ChartCard,
} from "@/components/ui";
import { ArrowRight, TrendingUp, Download, Settings } from "lucide-react";

export default function DemoPage() {
  const [timeframe, setTimeframe] = useState("6M");
  const [amount, setAmount] = useState("1000");
  const [risk, setRisk] = useState("2");

  return (
    <DashboardLayout
      navProps={{
        user: {
          name: "Demo User",
          email: "demo@tradesense.ai",
        },
        balance: {
          fiat: 10000,
          trading: 15000,
          change: 5000,
        },
        onDeposit: () => console.log("Deposit clicked"),
        onLogout: () => console.log("Logout clicked"),
      }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          UI Components Showcase
        </h1>
        <p className="text-gray-400 text-lg">
          All new components working with dark-first design and neon green accents
        </p>
      </div>

      {/* Buttons Section */}
      <Card variant="glass" padding="lg" className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">
            Primary Small
          </Button>
          <Button variant="primary" size="md">
            Primary Medium
          </Button>
          <Button variant="primary" size="lg">
            Primary Large
          </Button>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="outline" size="md">
            Outline
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="primary" size="md" loading={true}>
            Loading...
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="h-5 w-5" />}
            iconPosition="right"
          >
            With Icon
          </Button>
        </div>
      </Card>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card variant="glass" padding="lg">
          <h3 className="text-xl font-semibold text-white mb-2">
            Glass Card
          </h3>
          <p className="text-gray-400">
            Semi-transparent with backdrop blur effect
          </p>
        </Card>
        <Card variant="solid" padding="lg">
          <h3 className="text-xl font-semibold text-white mb-2">
            Solid Card
          </h3>
          <p className="text-gray-400">Opaque background, clean look</p>
        </Card>
        <Card variant="elevated" padding="lg" hover>
          <h3 className="text-xl font-semibold text-white mb-2">
            Elevated Card
          </h3>
          <p className="text-gray-400">With shadow and hover effect</p>
        </Card>
      </div>

      {/* Price Display Section */}
      <Card variant="glass" padding="lg" className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Price Displays
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-gray-400 text-sm mb-2">Large with positive change</p>
            <PriceDisplay price={43250.5} changePercent={2.4} size="lg" />
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Medium with negative change</p>
            <PriceDisplay price={2890.75} changePercent={-1.2} size="md" />
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Small without trend</p>
            <PriceDisplay price={98.5} size="sm" showTrend={false} />
          </div>
        </div>
      </Card>

      {/* Inputs Section */}
      <Card variant="glass" padding="lg" className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Input Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            error="Password must be at least 8 characters"
            placeholder="Enter password"
          />
          <SearchInput placeholder="Search markets, assets..." />
          <TradingInput
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            unit="USD"
            min={0}
          />
          <TradingInput
            label="Risk Percentage"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            unit="%"
            min={0}
            max={100}
          />
        </div>
      </Card>

      {/* Market Pairs Section */}
      <Card variant="glass" padding="lg" className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Market Pairs</h2>
        <div className="space-y-3">
          <MarketPair
            symbol="BTC/USDT"
            name="Bitcoin"
            price={43250.5}
            change={2.4}
            volume="$2.1B"
            onClick={() => console.log("BTC clicked")}
          />
          <MarketPair
            symbol="ETH/USDT"
            name="Ethereum"
            price={2890.75}
            change={-1.2}
            volume="$980M"
            onClick={() => console.log("ETH clicked")}
          />
          <MarketPair
            symbol="SOL/USDT"
            name="Solana"
            price={98.5}
            change={5.7}
            volume="$450M"
            onClick={() => console.log("SOL clicked")}
          />
        </div>
      </Card>

      {/* Chart Card Section */}
      <ChartCard
        title="Portfolio Balance"
        value={25000.95}
        change={{ value: 5000.95, percent: 25 }}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        className="mb-6"
      >
        <div className="flex items-center justify-center h-full bg-gray-900/50 rounded-lg">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="text-gray-400">Chart Component Goes Here</p>
            <p className="text-sm text-gray-500 mt-2">
              (Recharts or TradingView integration)
            </p>
          </div>
        </div>
      </ChartCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card variant="glass" padding="lg">
          <p className="text-gray-400 text-sm mb-2">Total Profit</p>
          <PriceDisplay price={5000.95} changePercent={25} size="lg" />
          <p className="text-gray-500 text-xs mt-2">Last 30 days</p>
        </Card>
        <Card variant="glass" padding="lg">
          <p className="text-gray-400 text-sm mb-2">Win Rate</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-bold text-white">68.5</span>
            <span className="text-2xl font-mono text-gray-400">%</span>
          </div>
          <p className="text-profit text-xs mt-2">↑ 5.2% from last month</p>
        </Card>
        <Card variant="glass" padding="lg">
          <p className="text-gray-400 text-sm mb-2">Active Positions</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-bold text-white">12</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">Across 3 markets</p>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card variant="glass" padding="lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              Ready to Start Trading?
            </h3>
            <p className="text-gray-400">
              All components are working perfectly with the new design system
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="md"
              icon={<Download className="h-5 w-5" />}
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Settings className="h-5 w-5" />}
            >
              Configure
            </Button>
          </div>
        </div>
      </Card>

      {/* Success Message */}
      <div className="mt-8 p-6 rounded-lg bg-profit/10 border border-profit/30">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-profit flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
          <div>
            <h4 className="text-profit font-semibold mb-1">
              UI Transformation Complete!
            </h4>
            <p className="text-profit/80 text-sm">
              All components are rendering with the new dark-first design system.
              Neon green accents, glassmorphism effects, and smooth animations are
              working as expected. You can now start building your trading interface!
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

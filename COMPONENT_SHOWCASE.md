# 🎨 TradeSense AI - Component Showcase

## Visual Guide to the New UI Component Library

---

## 🎯 Overview

This document showcases all the UI components available in the TradeSense AI Platform after the UI transformation.

---

## 🔘 Buttons

### Primary Button
```tsx
<Button variant="primary" size="md">
  Get Started
</Button>
```
**Appearance**: Neon green (#C7FF00) background with dark text, shadow glow effect
**Use Case**: Primary CTAs, submit actions, main navigation

### Secondary Button
```tsx
<Button variant="secondary" size="md">
  Learn More
</Button>
```
**Appearance**: Dark gray background with white text and border
**Use Case**: Secondary actions, cancel buttons

### Outline Button
```tsx
<Button variant="outline" size="md">
  View Details
</Button>
```
**Appearance**: Transparent with neon green border, becomes solid on hover
**Use Case**: Tertiary actions, links styled as buttons

### Ghost Button
```tsx
<Button variant="ghost" size="md">
  Skip
</Button>
```
**Appearance**: Transparent, subtle hover effect
**Use Case**: Minimal actions, navigation items

### Button Sizes
```tsx
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>
```

### Button with Icon
```tsx
<Button variant="primary" icon={<ArrowRight />} iconPosition="right">
  Continue
</Button>
```

### Loading Button
```tsx
<Button variant="primary" loading={true}>
  Processing...
</Button>
```
**Appearance**: Spinner animation, button disabled

---

## 🎴 Cards

### Glass Card (Glassmorphism)
```tsx
<Card variant="glass" padding="lg">
  <h3>Glassmorphic Card</h3>
  <p>Semi-transparent with backdrop blur</p>
</Card>
```
**Appearance**: Dark translucent background, blur effect, subtle border
**Use Case**: Dashboard widgets, floating panels, modern overlays

### Solid Card
```tsx
<Card variant="solid" padding="lg">
  <h3>Solid Card</h3>
  <p>Opaque background</p>
</Card>
```
**Appearance**: Solid dark background (#161B22), no blur
**Use Case**: Standard content containers, list items

### Elevated Card
```tsx
<Card variant="elevated" padding="lg">
  <h3>Elevated Card</h3>
  <p>With shadow for depth</p>
</Card>
```
**Appearance**: Solid background with prominent shadow
**Use Case**: Important sections, modal-like containers

### Card with Hover Effect
```tsx
<Card variant="glass" padding="lg" hover>
  <h3>Hoverable Card</h3>
  <p>Try hovering over me!</p>
</Card>
```
**Appearance**: Border and shadow glow on hover
**Use Case**: Clickable cards, interactive elements

### Padding Options
```tsx
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding (16px)</Card>
<Card padding="md">Medium padding (24px)</Card>
<Card padding="lg">Large padding (32px)</Card>
```

---

## 💰 Price Display

### Basic Price Display
```tsx
<PriceDisplay price={43250.50} size="lg" showTrend={false} />
```
**Display**: $43,250.50 in large monospace font

### Price with Positive Change
```tsx
<PriceDisplay 
  price={43250.50} 
  changePercent={2.4} 
  size="lg" 
/>
```
**Display**: $43,250.50 ↑ +2.40% (green)

### Price with Negative Change
```tsx
<PriceDisplay 
  price={43250.50} 
  changePercent={-1.8} 
  size="lg" 
/>
```
**Display**: $43,250.50 ↓ -1.80% (red)

### Price with Amount Change
```tsx
<PriceDisplay 
  price={43250.50} 
  change={890.25} 
  size="lg" 
/>
```
**Display**: $43,250.50 ↑ +$890.25 (green)

### Size Variants
```tsx
<PriceDisplay price={1234.56} size="sm" />  // Small (text-xl)
<PriceDisplay price={1234.56} size="md" />  // Medium (text-2xl)
<PriceDisplay price={1234.56} size="lg" />  // Large (text-4xl)
```

---

## 📝 Input Components

### Basic Input
```tsx
<Input 
  label="Email Address" 
  type="email" 
  placeholder="you@example.com" 
/>
```
**Appearance**: Dark background, neon green focus ring

### Input with Error
```tsx
<Input 
  label="Email Address" 
  type="email" 
  error="This email is already taken" 
  placeholder="you@example.com" 
/>
```
**Appearance**: Red border and text for error state

### Input with Helper Text
```tsx
<Input 
  label="Username" 
  helperText="Must be 3-20 characters" 
  placeholder="johndoe" 
/>
```

### Search Input
```tsx
<SearchInput 
  placeholder="Search markets..." 
  onSearch={(value) => console.log(value)} 
/>
```
**Appearance**: Search icon on the left, auto-searches on type

### Trading Input (with Unit)
```tsx
<TradingInput 
  label="Amount" 
  value={1000} 
  unit="USD" 
  min={0} 
/>
```
**Appearance**: Monospace font, unit displayed on the right

### Trading Input with Percentage
```tsx
<TradingInput 
  label="Risk Percentage" 
  value={2} 
  unit="%" 
  min={0} 
  max={100} 
/>
```

---

## 📊 Market Pair Display

### Basic Market Pair
```tsx
<MarketPair 
  symbol="BTC/USDT" 
  name="Bitcoin" 
  price={43250.50} 
  change={2.4} 
/>
```
**Display**: 
- Left: Icon (or gradient circle with "B"), "BTC/USDT", "Bitcoin"
- Right: $43,250.50, +2.40% (green)

### Market Pair with Negative Change
```tsx
<MarketPair 
  symbol="ETH/USDT" 
  name="Ethereum" 
  price={2890.75} 
  change={-1.2} 
/>
```
**Display**: Change shown in red with down arrow

### Market Pair with Volume
```tsx
<MarketPair 
  symbol="SOL/USDT" 
  name="Solana" 
  price={98.50} 
  change={5.7} 
  volume="$1.2B" 
/>
```

### Clickable Market Pair
```tsx
<MarketPair 
  symbol="BTC/USDT" 
  name="Bitcoin" 
  price={43250.50} 
  change={2.4} 
  onClick={() => console.log('Selected BTC')} 
/>
```
**Appearance**: Cursor pointer, hover effect

---

## 📈 Chart Card

### Chart Card with Timeframe Selector
```tsx
<ChartCard 
  title="Balance" 
  value={4999.95} 
  change={{ value: 999.95, percent: 20 }} 
  timeframe="6M" 
  onTimeframeChange={(tf) => setTimeframe(tf)}
>
  <YourChartComponent />
</ChartCard>
```
**Display**:
- Header: Title, large price with trend
- Timeframe buttons (1H, 1D, 1W, 1M, 6M, 1Y)
- Chart content area (responsive height)

### Chart Card without Change
```tsx
<ChartCard 
  title="Trading Volume" 
  value={1250000} 
  timeframe="1D" 
  onTimeframeChange={(tf) => setTimeframe(tf)}
>
  <VolumeChart />
</ChartCard>
```

### Chart Card without Timeframe Selector
```tsx
<ChartCard 
  title="Portfolio Distribution" 
  value={10000}
>
  <PieChart />
</ChartCard>
```

---

## 🧭 Navigation Components

### Top Navigation Bar
```tsx
<TopNav 
  user={{
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatar.jpg'
  }}
  balance={{
    fiat: 10000,
    trading: 15000,
    change: 5000
  }}
  onDeposit={() => console.log('Deposit')}
  onLogout={() => console.log('Logout')}
/>
```
**Display**:
- Left: Logo (TradeSense)
- Right: Fiat balance, Trading balance (color-coded), Deposit button, User avatar
- User menu dropdown: Profile, Settings, Logout

### Sidebar Navigation
```tsx
<Sidebar />
```
**Display**:
- Vertical menu with icons and labels
- Active item highlighted in neon green
- Menu items: Discover, Assets, Funds, Calendar, Settings
- Bottom: "Upgrade to Pro" card

### Mobile Sidebar
```tsx
<MobileSidebar 
  isOpen={isMobileMenuOpen} 
  onClose={() => setIsMobileMenuOpen(false)} 
/>
```
**Display**: Slide-in drawer from left with backdrop overlay

---

## 🎭 Layouts

### Dashboard Layout
```tsx
<DashboardLayout 
  navProps={{
    user: { name: 'John', email: 'john@example.com' },
    balance: { fiat: 10000, trading: 15000, change: 5000 },
    onDeposit: () => {},
    onLogout: () => {}
  }}
>
  <h1>Dashboard Content</h1>
  {/* Your dashboard widgets here */}
</DashboardLayout>
```
**Structure**:
- Sticky TopNav at top
- Sidebar on left (hidden on mobile)
- Main content area with max-width container
- Gradient dark background
- Floating menu button (mobile only)

### Landing Layout
```tsx
<LandingLayout>
  <section className="py-20">
    <h1>Landing Page Content</h1>
  </section>
</LandingLayout>
```
**Structure**:
- Fixed navigation with blur effect
- Animated gradient background (purple/blue blobs)
- Navigation links (Home, Market, Features, About)
- Auth buttons (Login, Get Started)
- Footer with links
- Responsive mobile menu

---

## 🎨 Color System Quick Reference

### Primary Colors
```tsx
className="bg-primary"        // Neon green (#C7FF00)
className="bg-purple"         // Electric purple (#6C4FE0)
className="bg-navy"           // Deep navy (#0A0E27)
```

### Background Colors
```tsx
className="bg-gray-900"       // Main background (#0D1117)
className="bg-gray-800"       // Secondary surface (#161B22)
className="bg-gray-700"       // Tertiary surface (#1F2937)
className="bg-gray-900/50"    // Semi-transparent
```

### Text Colors
```tsx
className="text-white"        // Primary text
className="text-gray-400"     // Secondary text (#9CA3AF)
className="text-gray-500"     // Tertiary text (#6B7280)
className="text-primary"      // Neon green text
```

### Trading Colors
```tsx
className="text-profit"       // Green (#10B981) for gains
className="text-loss"         // Red (#EF4444) for losses
```

### Border Colors
```tsx
className="border-white/10"   // Subtle border (10% opacity)
className="border-gray-800"   // Standard border
className="border-primary"    // Accent border
```

---

## ✨ Special Effects

### Glassmorphism Effect
```tsx
<div className="bg-gray-900/50 backdrop-blur-xl border border-white/10">
  Glass effect content
</div>
```

### Gradient Text
```tsx
<h1 className="gradient-text">
  Gradient Text
</h1>
// or
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple">
  Custom Gradient
</h1>
```

### Glow Shadow
```tsx
<div className="shadow-glow">
  Glowing element
</div>
// or
<div className="shadow-lg shadow-primary/30">
  Custom glow
</div>
```

### Hover Transform
```tsx
<Card hover>
  Hover to see lift effect
</Card>
```

### Fade In Animation
```tsx
<div className="animate-fadeIn">
  Fades in on mount
</div>
```

### Slow Pulse
```tsx
<div className="animate-pulse-slow">
  Pulses slowly
</div>
```

---

## 📱 Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Responsive Examples

#### Hide on Mobile
```tsx
<div className="hidden md:block">
  Desktop only
</div>
```

#### Show on Mobile Only
```tsx
<div className="md:hidden">
  Mobile only
</div>
```

#### Responsive Padding
```tsx
<div className="px-4 md:px-6 lg:px-8">
  Responsive padding
</div>
```

#### Responsive Text Size
```tsx
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsive heading
</h1>
```

#### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

---

## 🎯 Common Patterns

### Card Grid (Dashboard Widgets)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <Card variant="glass" padding="lg">Widget 1</Card>
  <Card variant="glass" padding="lg">Widget 2</Card>
  <Card variant="glass" padding="lg">Widget 3</Card>
</div>
```

### Market List
```tsx
<Card variant="glass" padding="md">
  <h3 className="text-xl font-semibold mb-4">Markets</h3>
  <div className="space-y-3">
    <MarketPair symbol="BTC/USDT" name="Bitcoin" price={43250} change={2.4} />
    <MarketPair symbol="ETH/USDT" name="Ethereum" price={2890} change={-1.2} />
    <MarketPair symbol="SOL/USDT" name="Solana" price={98.5} change={5.7} />
  </div>
</Card>
```

### Form Section
```tsx
<Card variant="glass" padding="lg">
  <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
  <div className="space-y-4">
    <Input label="Full Name" value="John Doe" />
    <Input label="Email" type="email" value="john@example.com" />
    <Input label="Password" type="password" />
    <Button variant="primary" className="w-full">
      Save Changes
    </Button>
  </div>
</Card>
```

### Stats Section
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <Card variant="glass" padding="lg">
    <p className="text-gray-400 text-sm mb-2">Total Balance</p>
    <PriceDisplay price={25000} size="lg" showTrend={false} />
  </Card>
  <Card variant="glass" padding="lg">
    <p className="text-gray-400 text-sm mb-2">Today's Profit</p>
    <PriceDisplay price={1250} changePercent={5.2} size="lg" />
  </Card>
  <Card variant="glass" padding="lg">
    <p className="text-gray-400 text-sm mb-2">Open Positions</p>
    <p className="text-4xl font-mono font-bold text-white">12</p>
  </Card>
</div>
```

### Action Bar
```tsx
<div className="flex items-center justify-between">
  <h2 className="text-2xl font-semibold text-white">Portfolio</h2>
  <div className="flex gap-3">
    <Button variant="secondary" size="sm">Filter</Button>
    <Button variant="primary" size="sm">Add Asset</Button>
  </div>
</div>
```

---

## 🎨 Typography Examples

### Display Heading (Landing)
```tsx
<h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
  Smarter Crypto Trading
</h1>
```

### Section Heading
```tsx
<h2 className="text-4xl font-bold text-white mb-4">
  Features
</h2>
```

### Card Title
```tsx
<h3 className="text-xl font-semibold text-white mb-4">
  Card Title
</h3>
```

### Body Text
```tsx
<p className="text-base text-gray-400">
  Regular body text for descriptions and content.
</p>
```

### Small Text
```tsx
<p className="text-sm text-gray-500">
  Helper text, captions, and secondary information.
</p>
```

### Monospace (Financial Data)
```tsx
<span className="font-mono text-2xl font-bold text-white">
  $43,250.50
</span>
```

---

## 🎭 State Variations

### Loading State
```tsx
<Button variant="primary" loading={true}>
  Loading...
</Button>
```

### Disabled State
```tsx
<Button variant="primary" disabled>
  Disabled Button
</Button>
<Input label="Field" disabled value="Disabled" />
```

### Error State
```tsx
<Input 
  label="Email" 
  error="Invalid email address" 
  value="invalid@" 
/>
```

### Success State (Custom)
```tsx
<div className="p-4 rounded-lg bg-profit/10 border border-profit/30 text-profit">
  ✓ Action completed successfully
</div>
```

### Warning State (Custom)
```tsx
<div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-500">
  ⚠ Please verify your account
</div>
```

---

## 📦 Import Cheat Sheet

```tsx
// All UI components in one import
import { 
  Button, 
  Card, 
  PriceDisplay, 
  Input, 
  SearchInput, 
  TradingInput, 
  MarketPair, 
  ChartCard 
} from '@/components/ui';

// All layout components
import { 
  DashboardLayout, 
  LandingLayout, 
  TopNav, 
  Sidebar, 
  MobileSidebar 
} from '@/components/layout';

// Utility
import { cn } from '@/utils/cn';
```

---

## 🎉 You're Ready!

You now have access to a complete, professional UI component library designed specifically for crypto trading platforms. All components follow the dark-first design system with neon green accents and glassmorphism effects.

**Start building amazing trading interfaces!** 🚀
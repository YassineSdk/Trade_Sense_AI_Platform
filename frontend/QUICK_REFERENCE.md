# 🚀 TradeSense AI - Quick Reference Card

## Import Components

```tsx
// UI Components (all at once)
import { Button, Card, PriceDisplay, Input, SearchInput, TradingInput, MarketPair, ChartCard } from '@/components/ui';

// Layouts
import { DashboardLayout, LandingLayout, TopNav, Sidebar } from '@/components/layout';

// Utility
import { cn } from '@/utils/cn';
```

---

## Color Classes

```tsx
// Backgrounds
bg-primary        // Neon green #C7FF00
bg-gray-900       // Dark background #0D1117
bg-gray-800       // Surface #161B22
bg-gray-900/50    // Semi-transparent

// Text
text-white        // Primary text
text-gray-400     // Secondary text
text-primary      // Neon green
text-profit       // Green (gains)
text-loss         // Red (losses)

// Borders
border-white/10   // Subtle
border-gray-800   // Standard
border-primary    // Accent
```

---

## Button Variants

```tsx
<Button variant="primary">Primary CTA</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icon & loading
<Button icon={<Icon />} iconPosition="right">Continue</Button>
<Button loading={true}>Processing...</Button>
```

---

## Card Variants

```tsx
<Card variant="glass">Glassmorphic (blur)</Card>
<Card variant="solid">Solid background</Card>
<Card variant="elevated">With shadow</Card>

// Padding & hover
<Card padding="lg" hover>Hoverable card</Card>
```

---

## Price Display

```tsx
// Basic price
<PriceDisplay price={43250.50} />

// With change percentage
<PriceDisplay price={43250.50} changePercent={2.4} />

// Sizes
<PriceDisplay price={1000} size="sm" />  // Small
<PriceDisplay price={1000} size="md" />  // Medium
<PriceDisplay price={1000} size="lg" />  // Large
```

---

## Inputs

```tsx
// Basic input
<Input label="Email" type="email" placeholder="you@example.com" />

// With error
<Input label="Email" error="Invalid email" />

// Search input
<SearchInput placeholder="Search markets..." />

// Trading input
<TradingInput label="Amount" value={1000} unit="USD" />
<TradingInput label="Risk" value={2} unit="%" />
```

---

## Market Pair

```tsx
<MarketPair 
  symbol="BTC/USDT" 
  name="Bitcoin" 
  price={43250.50} 
  change={2.4} 
  onClick={() => handleClick()}
/>
```

---

## Chart Card

```tsx
<ChartCard 
  title="Balance" 
  value={4999.95} 
  change={{ value: 999.95, percent: 20 }} 
  timeframe="6M" 
  onTimeframeChange={setTimeframe}
>
  <YourChart />
</ChartCard>
```

---

## Layouts

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
  {/* Your dashboard content */}
</DashboardLayout>
```

### Landing Layout
```tsx
<LandingLayout>
  {/* Your landing page content */}
</LandingLayout>
```

---

## Typography

```tsx
// Display (Landing pages)
<h1 className="text-6xl font-bold text-white">Hero Heading</h1>

// Section heading
<h2 className="text-4xl font-bold text-white">Section</h2>

// Card title
<h3 className="text-xl font-semibold text-white">Card Title</h3>

// Body text
<p className="text-base text-gray-400">Description</p>

// Small text
<p className="text-sm text-gray-500">Helper text</p>

// Monospace (numbers)
<span className="font-mono text-2xl font-bold text-white">$1,234.56</span>
```

---

## Common Patterns

### Grid of Cards
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <Card variant="glass" padding="lg">Widget 1</Card>
  <Card variant="glass" padding="lg">Widget 2</Card>
  <Card variant="glass" padding="lg">Widget 3</Card>
</div>
```

### Form Section
```tsx
<Card variant="glass" padding="lg">
  <h2 className="text-2xl font-semibold mb-6">Settings</h2>
  <div className="space-y-4">
    <Input label="Name" />
    <Input label="Email" type="email" />
    <Button variant="primary" className="w-full">Save</Button>
  </div>
</Card>
```

### Action Bar
```tsx
<div className="flex items-center justify-between">
  <h2 className="text-2xl font-semibold text-white">Portfolio</h2>
  <div className="flex gap-3">
    <Button variant="secondary" size="sm">Filter</Button>
    <Button variant="primary" size="sm">Add</Button>
  </div>
</div>
```

---

## Responsive Classes

```tsx
// Hide on mobile, show on desktop
className="hidden md:block"

// Show on mobile, hide on desktop
className="md:hidden"

// Responsive padding
className="px-4 md:px-6 lg:px-8"

// Responsive text
className="text-2xl md:text-4xl lg:text-6xl"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Effects

```tsx
// Glassmorphism
className="bg-gray-900/50 backdrop-blur-xl border border-white/10"

// Gradient text
className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple"

// Glow shadow
className="shadow-lg shadow-primary/30"

// Hover lift
<Card hover>Lifts on hover</Card>

// Fade in
className="animate-fadeIn"

// Slow pulse
className="animate-pulse-slow"
```

---

## Utility: cn()

```tsx
import { cn } from '@/utils/cn';

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  error ? 'error-class' : 'normal-class',
  props.className
)} />
```

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npm run type-check

# Run tests
npm run test
```

---

## File Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components
├── pages/            # Page components
├── services/         # API services
├── store/            # State management
├── utils/            # Utilities (cn, etc.)
└── index.css         # Global styles
```

---

## Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  (md:)
- **Desktop**: > 1024px       (lg:)

---

## TypeScript Types

```tsx
// Component props always typed
interface MyComponentProps {
  title: string;
  count?: number;
  onAction?: () => void;
  children: React.ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({ ... }) => {
  // Component code
};
```

---

## Key Principles

1. ✅ **Preserve content** - Never change text or data
2. ✅ **Use design tokens** - bg-primary, text-profit, etc.
3. ✅ **Always use cn()** - For merging classes
4. ✅ **TypeScript types** - For all components
5. ✅ **Responsive first** - Mobile, tablet, desktop

---

## Full Documentation

- **Quick Start**: `QUICK_START_UI.md`
- **Full Guide**: `UI_TRANSFORMATION_GUIDE.md`
- **Showcase**: `COMPONENT_SHOWCASE.md`
- **Summary**: `UI_TRANSFORMATION_SUMMARY.md`

---

**Keep this card handy while developing!** 📌
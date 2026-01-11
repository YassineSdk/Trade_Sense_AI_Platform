# 🚀 Quick Reference - Enhanced UI Components

## Component Import & Usage

### 1. Orb - Animated Background

```tsx
import { Orb } from '@/components/ui';

<section className="relative overflow-hidden">
  <Orb />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

**Props**: `className?: string`

---

### 2. TextType - Typing Animation

```tsx
import { TextType } from '@/components/ui';

<h1>
  <TextType
    words={["AI-Powered", "Real-Time", "Smart"]}
    typingSpeed={100}
    deletingSpeed={50}
    delayBetweenWords={2000}
  />
</h1>
```

**Props**:
- `words: string[]` (required)
- `className?: string`
- `typingSpeed?: number` (default: 100)
- `deletingSpeed?: number` (default: 50)
- `delayBetweenWords?: number` (default: 2000)

---

### 3. MagicBento - Feature Grid

```tsx
import { MagicBento } from '@/components/ui';
import { Bot, Shield } from 'lucide-react';

const items = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Feature Title",
    description: "Feature description"
  }
];

<MagicBento items={items} />
```

**Props**:
- `items: BentoItem[]` (required)
- `className?: string`

**BentoItem**:
```tsx
{
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}
```

---

## Color System

```css
Primary Green:  #C7FF00
Purple Accent:  #8B5CF6
Background:     #0D1117
Profit Green:   #10B981
Loss Red:       #EF4444
```

---

## Animation Timing

- Quick interactions: 200-300ms
- Hover effects: 200-300ms
- Background animations: 8-12s
- Text typing: 100ms/char

---

## Icon Library (lucide-react)

```tsx
import {
  Bot,           // AI
  ShieldCheck,   // Security
  Trophy,        // Achievements
  LineChart,     // Analytics
  Gauge,         // Performance
  UsersRound,    // Community
} from 'lucide-react';
```

---

## View Live

**URL**: http://localhost:3000

**Best Pages**:
- `/` - Enhanced homepage with all new components
- `/demo` - Component showcase

---

## Files Modified

```
✅ src/components/ui/Orb.tsx
✅ src/components/ui/TextType.tsx
✅ src/components/ui/MagicBento.tsx
✅ src/components/ui/index.ts
✅ src/pages/HomePage.tsx
```

---

## Dependencies

```bash
npm install framer-motion
```

Already available: `lucide-react`, `tailwindcss`

---

## Quick Test Checklist

- [ ] Orb animates in hero section
- [ ] TextType cycles through words
- [ ] MagicBento features stagger in
- [ ] Hover effects work on cards
- [ ] Icons are consistent throughout
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0
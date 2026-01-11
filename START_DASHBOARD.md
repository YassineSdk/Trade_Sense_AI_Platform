# 🚀 TradeSense AI Dashboard - Quick Start Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Python 3.8+
- Backend dependencies installed
- Frontend dependencies installed

---

## 🔥 Start the Application

### Step 1: Start Backend Server

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Start the Flask server
python run.py
```

**Backend should be running on:** `http://localhost:5000`

---

### Step 2: Start Frontend Development Server

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Start Vite dev server
npm run dev
```

**Frontend should be running on:** `http://localhost:3000`

---

## 🎯 Access the Dashboard

1. **Open your browser** and navigate to: `http://localhost:3000`

2. **Login or Register:**
   - If you have an account, click "Login"
   - If not, click "Register" to create a new account
   - Use test credentials:
     - Email: `admin@tradesense.ai`
     - Password: (your password)

3. **View the Dashboard:**
   - After login, you'll be automatically redirected to `/dashboard`
   - You should see the fully redesigned dashboard with all components

---

## 📱 What You'll See

### ✅ Dashboard Components

1. **Fixed Left Sidebar** (280px)
   - Logo and branding
   - Navigation menu with icons
   - Active route highlighting
   - Section grouping (Main, Account, Utility)

2. **Top Header Bar**
   - Dynamic page title
   - Search bar
   - Notification icon
   - Settings icon
   - User avatar and info

3. **Market Ticker Strip**
   - 6 market indices (GOLD, DOW, S&P 500, NASDAQ, DSEX, DSES)
   - Real-time values with sparklines
   - Color-coded changes (green/red)

4. **Primary Analytics Grid** (3 columns)
   - Market Line Chart with tab switcher
   - Stock Exchange Summary with 52-week range
   - Strength Meter gauge

5. **Secondary Data Section**
   - Top Value Table (8 instruments)
   - Sector Distribution Chart (6 sectors)

---

## 🧭 Navigation

You can navigate to these pages from the sidebar:

- **Dashboard** - Main analytics view
- **Market Update** - Real-time market data
- **Income Estimator** - Income calculation tools
- **Interactive Chart** - Advanced charting
- **Mutual Funds** - Fund analysis
- **Portfolio** - Portfolio management
- **Settings** - User settings
- **History** - Transaction history
- **News** - Latest market news (5 unread)
- **Feedback** - Send feedback

---

## 🎨 Visual Features to Notice

### Color Coding
- 🟢 **Green**: Positive changes, profit, growth
- 🔴 **Red**: Negative changes, loss, decline
- 🟡 **Yellow**: Lime green for primary actions and highlights

### Animations
- **Hover Effects**: Cards brighten, text changes to primary color
- **Active States**: Navigation items glow with lime green
- **Smooth Transitions**: All state changes are animated
- **Shimmer Effects**: Progress bars have subtle shimmer
- **Pulse**: Live indicators pulse gently

### Dark Theme
- Near-black background (#0D1117)
- Semi-transparent cards with backdrop blur
- Subtle borders (white/5)
- Professional, premium aesthetic

---

## 🔧 Troubleshooting

### Backend Not Starting?
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Linux/Mac

# Install missing dependencies
pip install -r requirements/dev.txt
```

### Frontend Not Starting?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Linux/Mac
```

### Login Issues?
- Ensure backend is running first
- Check browser console for errors
- Verify CORS settings in backend
- Clear browser cache and cookies

### Styling Issues?
```bash
# Rebuild Tailwind CSS
npm run dev

# If styles still don't load, try:
rm -rf .vite
npm run dev
```

---

## 📊 Test Data

All metrics and data currently shown are **hardcoded for demonstration**. To integrate real data:

1. Update component props to accept data from APIs
2. Create market data store in Zustand
3. Connect WebSocket for real-time updates
4. Replace static values with API responses

---

## 🎯 Key Files

### Dashboard Components
```
frontend/src/components/dashboard/
├── Sidebar.tsx              # Left navigation
├── Header.tsx               # Top bar
├── MarketTicker.tsx         # Metrics strip
├── MarketLineChart.tsx      # Chart with tabs
├── StockExchangeSummary.tsx # Index summary
├── StrengthMeter.tsx        # Gauge
├── TopValueTable.tsx        # Instruments table
└── SectorDistribution.tsx   # Sector chart
```

### Pages
```
frontend/src/pages/
├── DashboardPage.tsx        # Main dashboard layout
├── MarketPage.tsx           # Market update
├── IncomePage.tsx           # Income estimator
├── ChartPage.tsx            # Interactive chart
├── FundsPage.tsx            # Mutual funds
├── PortfolioPage.tsx        # Portfolio
├── HistoryPage.tsx          # History
├── NewsPage.tsx             # News
└── FeedbackPage.tsx         # Feedback
```

### Layout
```
frontend/src/components/layouts/
└── DashboardLayout.tsx      # App shell (sidebar + header)
```

---

## 📱 Responsive Testing

Test the dashboard at different screen sizes:

```
Desktop:  1280px+ (Full 3-column layout)
Tablet:   768px+  (2-column layout)
Mobile:   < 768px (Single column)
```

---

## ✅ Success Checklist

After starting the application, verify:

- [ ] Sidebar is fixed on the left with logo
- [ ] Header shows correct page title
- [ ] Market ticker displays 6 indices with sparklines
- [ ] Line chart renders with tabs (DSEX/DSES/DS30)
- [ ] Stock summary shows index value and range slider
- [ ] Gauge displays with animated needle
- [ ] Table shows 8 instruments with volume bars
- [ ] Sector chart shows 6 sectors with progress bars
- [ ] Navigation works (click sidebar items)
- [ ] Active route is highlighted in sidebar
- [ ] User info appears in header
- [ ] All colors are correctly applied (dark theme)
- [ ] Hover effects work smoothly
- [ ] No console errors

---

## 🆘 Getting Help

If you encounter issues:

1. Check `backend.log` for backend errors
2. Check browser DevTools console for frontend errors
3. Verify all dependencies are installed
4. Ensure both servers are running
5. Review `DASHBOARD_REDESIGN_COMPLETE.md` for detailed docs

---

## 🎉 You're Ready!

The TradeSense AI dashboard is now running with:
- ✅ Premium dark fintech theme
- ✅ Real-time market indicators
- ✅ Interactive visualizations
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ Professional UI/UX

Enjoy exploring the new dashboard! 🚀

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Support**: TradeSense AI Team
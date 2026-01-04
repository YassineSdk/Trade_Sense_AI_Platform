# TradeSense AI - Troubleshooting Guide

> Common issues and their solutions

---

## 🚨 Common Issues & Solutions

### 1. Module Not Found Errors

**Error:**
```
Error: Cannot find module 'framer-motion'
Error: Cannot find module 'react-tsparticles'
```

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

---

### 2. Port Already in Use

**Error:**
```
Port 3000 is already in use
```

**Solution (Windows):**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution (Mac/Linux):**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

---

### 3. Chart Not Rendering

**Issue:** TradingView chart shows blank screen

**Solution 1 - Check Container Height:**
```jsx
// Ensure chart container has fixed height
<div style={{ height: '500px' }}>
  <div ref={chartContainerRef} className="w-full h-full" />
</div>
```

**Solution 2 - Verify Package Installation:**
```bash
npm install lightweight-charts
```

**Solution 3 - Check Browser Console:**
- Press F12 to open DevTools
- Look for errors in Console tab
- Common issues:
  - Chart data format incorrect
  - Container not mounted
  - Import path wrong

---

### 4. Particles Causing Performance Issues

**Issue:** Page is slow or laggy

**Solution 1 - Reduce Particle Density:**
```jsx
<ParticleBackground density={40} opacity={0.2} />
// Instead of density={100}
```

**Solution 2 - Disable Particles on Mobile:**
```jsx
const isMobile = window.innerWidth < 768;

{!isMobile && <ParticleBackground density={60} opacity={0.3} />}
```

**Solution 3 - Limit FPS:**
```jsx
// In ParticleBackground.jsx
options={{
  fpsLimit: 30, // Reduce from 60
  // ... rest of options
}}
```

---

### 5. Tailwind Styles Not Applying

**Issue:** Custom classes don't work

**Solution 1 - Restart Dev Server:**
```bash
# Press Ctrl+C to stop
npm run dev
```

**Solution 2 - Check tailwind.config.js Content Paths:**
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

**Solution 3 - Verify @tailwind Directives in index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Solution 4 - Clear Build Cache:**
```bash
rm -rf node_modules/.vite
npm run dev
```

---

### 6. Build Fails

**Error:**
```
Build failed with errors
```

**Solution 1 - Clear Vite Cache:**
```bash
rm -rf node_modules/.vite
npm run build
```

**Solution 2 - Check for Syntax Errors:**
```bash
npm run lint
```

**Solution 3 - Update Dependencies:**
```bash
npm update
```

**Solution 4 - Delete dist and Rebuild:**
```bash
rm -rf dist
npm run build
```

---

### 7. ESLint Errors

**Error:**
```
'React' is not defined
'PropTypes' is missing in props validation
```

**Solution 1 - Update .eslintrc.cjs:**
```javascript
rules: {
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'no-unused-vars': 'warn',
}
```

**Solution 2 - Fix All Auto-Fixable Issues:**
```bash
npm run lint -- --fix
```

---

### 8. Icons Not Showing

**Issue:** Lucide icons appear as empty squares

**Solution 1 - Verify Import:**
```jsx
import { TrendingUp, User, Bell } from 'lucide-react';
```

**Solution 2 - Check Icon Name:**
```jsx
// Correct
<TrendingUp className="w-5 h-5" />

// Incorrect
<trendingUp className="w-5 h-5" />
```

**Solution 3 - Reinstall Icons Package:**
```bash
npm install lucide-react
```

---

### 9. Routing Not Working

**Issue:** Pages don't load or 404 errors

**Solution 1 - Check Route Paths:**
```jsx
// In App.jsx
<Route path="/" element={<LandingPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/dashboard" element={<Dashboard />} />
```

**Solution 2 - Verify BrowserRouter:**
```jsx
import { BrowserRouter as Router } from 'react-router-dom';

<Router>
  <Routes>
    {/* routes */}
  </Routes>
</Router>
```

**Solution 3 - Production Build Routing:**
If routes work in dev but not production, configure server:

**Netlify (_redirects file):**
```
/*    /index.html   200
```

**Vercel (vercel.json):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

### 10. Import Errors

**Error:**
```
Module not found: Can't resolve '../components/AnimatedButton'
```

**Solution 1 - Check File Path:**
```jsx
// Correct relative path
import AnimatedButton from '../components/AnimatedButton';

// Check file exists at:
// src/components/AnimatedButton.jsx
```

**Solution 2 - Check File Extension:**
```jsx
// Try with .jsx extension
import AnimatedButton from '../components/AnimatedButton.jsx';
```

**Solution 3 - Case Sensitivity:**
```bash
# Linux/Mac are case-sensitive
# AnimatedButton.jsx ≠ animatedbutton.jsx
```

---

### 11. Animations Not Working

**Issue:** Framer Motion animations don't play

**Solution 1 - Check Framer Motion Installation:**
```bash
npm list framer-motion
# Should show version 10.16.16

# If not installed:
npm install framer-motion
```

**Solution 2 - Verify Animation Props:**
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Solution 3 - Check for CSS Conflicts:**
```css
/* Remove any CSS that might interfere */
* {
  animation: none !important; /* Remove this if present */
}
```

---

### 12. API Calls Failing (CORS)

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution 1 - Configure Proxy in vite.config.js:**
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

**Solution 2 - Backend CORS Configuration:**
```python
# In Flask backend
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
```

---

### 13. Environment Variables Not Working

**Issue:** `import.meta.env.VITE_API_URL` is undefined

**Solution 1 - Check .env File:**
```bash
# Create .env in frontend root
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=TradeSense AI
```

**Solution 2 - Prefix with VITE_:**
```bash
# Must start with VITE_
VITE_MY_VAR=value  ✓
MY_VAR=value       ✗
```

**Solution 3 - Restart Dev Server:**
```bash
# Changes to .env require restart
Ctrl+C
npm run dev
```

---

### 14. Memory Issues / Slow Performance

**Issue:** Dev server runs slow or crashes

**Solution 1 - Increase Node Memory:**
```bash
# Windows
set NODE_OPTIONS=--max_old_space_size=4096
npm run dev

# Linux/Mac
NODE_OPTIONS=--max_old_space_size=4096 npm run dev
```

**Solution 2 - Disable Source Maps in Dev:**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: false
  }
})
```

**Solution 3 - Clear All Caches:**
```bash
rm -rf node_modules/.vite
rm -rf node_modules/.cache
npm cache clean --force
```

---

### 15. TypeScript Errors (if using TS)

**Error:**
```
Property 'xyz' does not exist on type
```

**Solution:**
This project uses JavaScript (.jsx), not TypeScript. If you converted to TypeScript:

```bash
# Install TypeScript dependencies
npm install -D typescript @types/react @types/react-dom

# Rename files
# .jsx → .tsx
# .js → .ts
```

---

## 🔍 Debugging Steps

### Step 1: Check Browser Console
```
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Read error messages carefully
```

### Step 2: Check Terminal Output
```
1. Look at terminal where dev server runs
2. Check for compilation errors
3. Look for warnings
```

### Step 3: Verify File Structure
```bash
frontend/
├── src/
│   ├── components/
│   │   ├── AnimatedButton.jsx
│   │   ├── AnimatedCard.jsx
│   │   ├── AnimatedCounter.jsx
│   │   ├── Navbar.jsx
│   │   ├── ParticleBackground.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Step 4: Test Basic Setup
```bash
# 1. Check Node version (should be 18+)
node --version

# 2. Check npm version
npm --version

# 3. Verify dependencies installed
npm list --depth=0

# 4. Try clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 🆘 Still Having Issues?

### Before Asking for Help:

1. ✅ Read error message completely
2. ✅ Check this troubleshooting guide
3. ✅ Search error on Google/Stack Overflow
4. ✅ Try clean reinstall
5. ✅ Check browser console (F12)

### When Reporting Issues:

Include:
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Operating system
- Full error message
- Steps to reproduce
- Screenshot if relevant

### Get Help:

- 📧 Email: support@tradesense.ai
- 💬 Discord: https://discord.gg/tradesense
- 🐛 GitHub Issues: Create detailed bug report

---

## 📋 Quick Health Check

Run this to check your setup:

```bash
# Navigate to frontend
cd Trading_Sense_APP/frontend

# Check Node version (should be 18+)
node --version

# Check if node_modules exists
ls node_modules | wc -l  # Should show many packages

# Check if all critical files exist
ls src/App.jsx
ls src/pages/Dashboard.jsx
ls package.json
ls vite.config.js

# Try starting dev server
npm run dev
```

---

## 🎯 Prevention Tips

1. **Always use Node 18+**
2. **Commit package-lock.json**
3. **Don't manually edit node_modules**
4. **Use exact package versions**
5. **Test in multiple browsers**
6. **Keep dependencies updated**
7. **Clear cache regularly**
8. **Use version control (Git)**

---

## 📚 Additional Resources

- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [React Common Issues](https://react.dev/learn)
- [Tailwind CSS Setup](https://tailwindcss.com/docs/installation)
- [Node.js Issues](https://nodejs.org/en/docs/)

---

**Last Updated:** 2024  
**Version:** 1.0.0

*Most issues can be fixed with a clean reinstall! When in doubt, delete node_modules and start fresh.* 🔄
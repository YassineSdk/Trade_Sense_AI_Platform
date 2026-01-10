# WSL Setup & Troubleshooting Guide for TradeSense AI Platform

## 🎯 Problem Solved

The error you experienced was caused by running **Windows npm** trying to access **WSL filesystem** through `\\wsl.localhost\...` paths. This creates permission conflicts and path resolution issues.

## ✅ Solution Applied

We've installed Node.js **inside WSL** using NVM, so now everything runs natively in the Linux environment.

---

## 🚀 Quick Start (You're Ready!)

Everything is now installed. Run this to start the dev server:

```bash
cd ~/projects/Trade_Sense_AI_Platform/frontend
bash dev.sh
```

Or manually:

```bash
cd ~/projects/Trade_Sense_AI_Platform/frontend
source ~/.nvm/nvm.sh
nvm use 18
npm run dev
```

Then open: **http://localhost:3000**

---

## 📋 What We Did

### 1. Installed Node.js 18 in WSL
- ✅ Used NVM (Node Version Manager)
- ✅ Installed Node.js 18.20.8
- ✅ npm 10.8.2 included

### 2. Cleaned Up Old Node Modules
- ✅ Removed corrupted Windows-accessed `node_modules`
- ✅ Fresh install from WSL environment

### 3. Installed All Dependencies
- ✅ 465 packages installed successfully
- ✅ All components and libraries ready
- ✅ Tailwind, Vite, React, TypeScript configured

### 4. Created Helper Scripts
- ✅ `install-node.sh` - Install Node.js in WSL
- ✅ `frontend/dev.sh` - Start dev server easily

---

## 🔧 Why This Happened

### The Root Cause

```
Windows npm → \\wsl.localhost\Ubuntu-24.04\home\yassine\... → Permission Errors
     ❌               ❌ UNC paths not supported              ❌
```

**Windows Command Prompt/PowerShell** cannot properly handle:
- UNC paths (\\wsl.localhost\...)
- Linux file permissions
- Symbolic links in node_modules
- Case-sensitive filesystems

### The Fix

```
WSL Terminal → /home/yassine/projects/... → Everything Works
     ✅              ✅ Native Linux paths      ✅
```

**WSL Terminal** handles everything natively:
- ✅ Proper Unix paths
- ✅ Linux permissions respected
- ✅ Symbolic links work
- ✅ Case-sensitive filesystem

---

## 📝 Important Rules for WSL Development

### ✅ DO:
1. **Always use WSL terminal** (Ubuntu terminal, not Windows CMD/PowerShell)
2. **Store projects in WSL filesystem** (`/home/user/...`, not `/mnt/c/...`)
3. **Install Node.js in WSL** (using NVM)
4. **Run npm commands from WSL terminal**

### ❌ DON'T:
1. **Don't use Windows terminal** for npm/node commands in WSL projects
2. **Don't access via `\\wsl.localhost\`** from Windows applications
3. **Don't install Windows Node.js** for WSL projects
4. **Don't mix Windows and WSL tools** for the same project

---

## 🛠️ Verification Checklist

Run these commands in **WSL terminal** to verify everything:

```bash
# 1. Check you're in WSL (not Windows)
uname -a
# Should show: Linux ... Ubuntu

# 2. Check Node.js is installed
node -v
# Should show: v18.20.8

# 3. Check npm is working
npm -v
# Should show: 10.8.2

# 4. Check project location is in WSL
pwd
# Should show: /home/yassine/... (NOT /mnt/c/...)

# 5. Check dependencies are installed
cd ~/projects/Trade_Sense_AI_Platform/frontend
ls node_modules/ | wc -l
# Should show: 465+ directories

# 6. Start dev server
npm run dev
# Should start without errors
```

---

## 🔍 Troubleshooting

### Issue: "node: not found"

**Solution:**
```bash
source ~/.nvm/nvm.sh
nvm use 18
```

Or add to `~/.bashrc`:
```bash
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
source ~/.bashrc
```

### Issue: "npm ERR! EISDIR" or "EPERM" errors

**Cause:** Running from Windows or accessing via `\\wsl.localhost\`

**Solution:**
1. Open WSL terminal (Ubuntu app from Start menu)
2. Navigate to project: `cd ~/projects/Trade_Sense_AI_Platform/frontend`
3. Run commands from there

### Issue: Node modules corrupted

**Solution:**
```bash
cd ~/projects/Trade_Sense_AI_Platform/frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Cannot find module" errors

**Solution:**
```bash
npm install
npm run dev
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 3001
```

---

## 📂 File System Structure

### ✅ Correct (WSL Filesystem)
```
/home/yassine/
└── projects/
    └── Trade_Sense_AI_Platform/
        ├── frontend/
        │   ├── node_modules/     ← Installed in WSL
        │   └── package.json
        └── backend/
```

### ❌ Incorrect (Windows Filesystem)
```
/mnt/c/Users/ayman/
└── projects/
    └── Trade_Sense_AI_Platform/
        └── frontend/
            ├── node_modules/     ← Performance issues
            └── package.json
```

**Why?** Node.js projects in `/mnt/c/` (Windows drives) are **100x slower** due to:
- Cross-filesystem operations
- Windows Defender scanning
- NTFS vs ext4 differences

---

## 🚦 How to Access Your Project

### From WSL Terminal (✅ Correct Way)
```bash
# Open WSL terminal
cd ~/projects/Trade_Sense_AI_Platform/frontend
npm run dev
```

### From VS Code (✅ Also Correct)
1. Install **"Remote - WSL"** extension
2. Click green button in bottom-left
3. Select "Connect to WSL"
4. Open folder: `/home/yassine/projects/Trade_Sense_AI_Platform`
5. Terminal will automatically use WSL

### From Windows Explorer (⚠️ View Only)
- Navigate to: `\\wsl.localhost\Ubuntu-24.04\home\yassine\projects\...`
- **Only for viewing/editing files**
- **Don't run commands from here!**

---

## 🎓 Understanding WSL Paths

### WSL sees Windows paths as:
```
C:\Users\ayman\     →  /mnt/c/Users/ayman/
D:\Projects\        →  /mnt/d/Projects/
```

### Windows sees WSL paths as:
```
/home/yassine/      →  \\wsl.localhost\Ubuntu-24.04\home\yassine\
/var/www/           →  \\wsl.localhost\Ubuntu-24.04\var\www\
```

### Where to store projects:
- ✅ **In WSL:** `/home/yassine/projects/` (Fast, native Linux)
- ❌ **In Windows:** `/mnt/c/Users/...` (Slow, compatibility issues)

---

## 🎯 Best Practices

### 1. Always Use WSL Terminal
```bash
# Right way ✅
cd ~/projects/Trade_Sense_AI_Platform/frontend
npm install
npm run dev

# Wrong way ❌ (from Windows CMD)
cd \\wsl.localhost\Ubuntu-24.04\home\yassine\projects\...
npm install  # Will fail!
```

### 2. Use VS Code Remote-WSL
- Install "Remote - WSL" extension
- Connect to WSL
- Work naturally as if in Linux

### 3. Keep Project in WSL Filesystem
- Store in `/home/yassine/projects/`
- Don't use `/mnt/c/...`
- Much faster performance

### 4. Load NVM in Every Terminal
Add to `~/.bashrc`:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

---

## 🚀 Ready to Develop

### Start Development Server
```bash
cd ~/projects/Trade_Sense_AI_Platform/frontend
bash dev.sh
```

Or:
```bash
cd ~/projects/Trade_Sense_AI_Platform/frontend
npm run dev
```

### Access the App
```
http://localhost:3000
```

### Available Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run type-check   # Check TypeScript types
npm run test         # Run tests
```

---

## 📚 Additional Resources

### Official Documentation
- [WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [NVM GitHub](https://github.com/nvm-sh/nvm)
- [Vite Documentation](https://vitejs.dev/)

### Useful WSL Commands
```bash
# Check WSL version
wsl --version

# Check distro info
wsl --list --verbose

# Restart WSL (from PowerShell as Admin)
wsl --shutdown

# Update WSL (from PowerShell as Admin)
wsl --update
```

---

## ✅ Summary

You're all set! The issue was mixing Windows and WSL environments. Now everything runs natively in WSL:

- ✅ Node.js 18.20.8 installed in WSL
- ✅ npm 10.8.2 working
- ✅ All 465 packages installed
- ✅ Dev server ready to start
- ✅ No more path/permission errors

**To start developing:**
```bash
cd ~/projects/Trade_Sense_AI_Platform/frontend
bash dev.sh
```

**Happy coding!** 🚀

---

**Last Updated:** January 10, 2024  
**Status:** ✅ All Issues Resolved
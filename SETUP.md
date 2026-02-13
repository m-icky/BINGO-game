# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1. Create Project Folder
```bash
mkdir bingo-bonanza
cd bingo-bonanza
```

### 2. Copy All Files
Place all the provided files in this directory:
- bingo-game.jsx
- main.jsx
- index.html
- index.css
- package.json
- vite.config.js
- tailwind.config.js
- postcss.config.js
- README.md

### 3. Install Dependencies
```bash
npm install
```

This will install:
- React & React DOM
- Framer Motion
- Tailwind CSS
- Vite
- All dev dependencies

### 4. Start Development Server
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### 5. Build for Production (Optional)
```bash
npm run build
```

Output will be in the `dist/` folder.

## Troubleshooting

**Port 3000 already in use?**
Edit `vite.config.js` and change the port number.

**Dependencies won't install?**
Make sure you have Node.js 16+ installed:
```bash
node --version
```

**Tailwind styles not working?**
Ensure all files are in the same directory and run:
```bash
npm run dev
```

## Project Structure
```
bingo-bonanza/
├── bingo-game.jsx       ← Main React component
├── main.jsx             ← Entry point
├── index.html           ← HTML template
├── index.css            ← Tailwind CSS
├── package.json         ← Dependencies
├── vite.config.js       ← Vite config
├── tailwind.config.js   ← Tailwind config
├── postcss.config.js    ← PostCSS config
└── README.md            ← Full documentation

After npm install:
├── node_modules/        ← Dependencies (auto-generated)
└── package-lock.json    ← Lock file (auto-generated)
```

## Features You'll See

✅ Name entry screen
✅ Manual number input grid
✅ Animated 5×5 BINGO board
✅ Click tiles to mark with strike-through
✅ Progressive letter highlighting (B→I→N→G→O)
✅ Strike counter (X/5)
✅ 5 strikes needed to win
✅ Confetti celebration
✅ Dark/Light theme toggle
✅ Fully responsive design

## That's It!

You're ready to play BINGO Bonanza! 🎉

Have fun and may the odds be ever in your favor! 🍀

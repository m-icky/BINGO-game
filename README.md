# 🎉 BINGO Bonanza!

A modern, interactive BINGO game built with React, Tailwind CSS, and Framer Motion. Features stunning animations, playful interactions, and a delightful user experience!

![BINGO Bonanza](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3.5-cyan) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-purple)

## ✨ Features

### Core Gameplay
- **Name entry screen** - personalized game experience
- **Manual number input** - fill your own 5×5 grid
- **FREE center tile** automatically marked
- **Click to mark/unmark** tiles with strike-through animation
- **Progressive strike system**:
  - Each completed line = 1 strike
  - Need 5 strikes to win
  - Letters turn green progressively (B→I→N→G→O)
- **Automatic win detection** for:
  - Horizontal rows (5 patterns)
  - Vertical columns (5 patterns)
  - Diagonals (2 patterns)
- **Winning pattern highlights** with golden ring animation

### Animations & Effects
- **Framer Motion** throughout:
  - Tile entrance animations (staggered reveal)
  - Click animations (scale & bounce)
  - Hover effects on all interactive elements
  - Win celebration with rotation and scale
- **Confetti burst** on BINGO (50 animated particles)
- **Smooth transitions** between game states

### Fun & Playful Elements
- **Personalized experience** with player name throughout
- **Strike counter** showing progress (X/5 strikes)
- **Progressive letter highlighting** - watch BINGO light up green letter by letter
- **Strike-through animation** on marked tiles
- **Confetti burst** on final victory (all 5 strikes)
- **Victory celebration** with personalized message

### UI/UX
- **Three-screen flow**:
  1. Name entry screen
  2. Number input screen
  3. Game play screen
- **Dark/Light theme toggle** with smooth transitions
- **Fully responsive** design (mobile, tablet, desktop)
- **Strike tracking** - visual counter and letter highlighting
- **Modern design** with:
  - Gradient backgrounds
  - Soft shadows
  - Rounded cards
  - Playful colors
  - Smooth animations throughout
- **Accessibility-friendly** with proper contrast ratios

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open in browser:**
The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎮 How to Play

1. **Enter your name** on the welcome screen
2. **Fill in all 25 numbers** manually in the grid (center is FREE)
3. **Click "Start Playing"** to begin the game
4. **Click tiles** to mark them with a strike-through effect
5. **Complete 5 strikes** (rows, columns, or diagonals) to spell B-I-N-G-O
6. **Each strike turns a letter green** (1st strike = B, 2nd = I, etc.)
7. **Watch the victory celebration** when all 5 letters turn green!
8. **Click "New Game"** to play again with new numbers

## 🏗️ Project Structure

```
bingo-bonanza/
├── bingo-game.jsx       # Main game component with all logic
├── main.jsx             # React entry point
├── index.html           # HTML template
├── index.css            # Tailwind CSS + custom styles
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## 🧩 Component Architecture

### `App` (Main Component)
- Manages game state (name, input, playing, won)
- Handles strike detection logic
- Tracks completed strikes and BINGO letter status
- Controls theme switching
- Coordinates all child components

### `NameEntry`
- Initial welcome screen
- Collects player name
- Animated entry with spring effects

### `NumberInput`
- Grid input for 25 numbers
- Validates all cells are filled
- Converts to game tile format
- Shows B-I-N-G-O headers

### `BingoBoard`
- Renders 5×5 grid of tiles
- Passes click handlers and state to tiles
- Highlights winning patterns

### `BingoTile`
- Individual tile component
- Handles marked/unmarked states
- Shows strike-through effect when marked
- Animates on click and hover
- Shows checkmark and diagonal line when marked

### `WinModal`
- Victory celebration overlay
- Displays confetti animation
- Shows personalized win message
- Offers "Play Again" button

### `Confetti`
- Creates 50 animated particles
- Randomized colors, positions, and timings
- Auto-removes after animation completes

## 🎨 Customization

### Changing the Strike Requirement

By default, you need 5 strikes to win (spelling B-I-N-G-O). To change this:

```javascript
// In the handleTileClick function, change:
if (strikes.length >= 5) {
  // To any number you want:
  if (strikes.length >= 3) { // Win with 3 strikes
```

### Modifying Letter Display

Edit the letters shown at the top:

```javascript
// Change from B-I-N-G-O to anything:
{['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
  // To:
{['W', 'I', 'N', 'N', 'E', 'R'].map((letter, i) => (
```

### Changing Colors

Edit the Tailwind classes in components:
- **Marked tiles**: `from-purple-600 to-pink-600`
- **Winning rings**: `ring-yellow-400`
- **Green letters**: `bg-green-500`
- **Buttons**: `from-blue-500 to-purple-600`

## 🛠️ Technologies Used

- **React 18.2** - UI framework with hooks
- **Framer Motion 10.16** - Animation library
- **Tailwind CSS 3.3** - Utility-first CSS
- **Vite 5.0** - Build tool and dev server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Future Enhancements

Potential features to add:
- [ ] Auto-call numbers mode (traditional bingo)
- [ ] Multiple players (local multiplayer)
- [ ] Import/export saved number grids
- [ ] Different winning patterns (corners, X-pattern, blackout)
- [ ] Sound effects for marks and wins
- [ ] Undo/redo functionality
- [ ] Game history with localStorage
- [ ] Printable bingo cards
- [ ] Time tracking and statistics
- [ ] Online multiplayer with WebSockets

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Icons: Emoji from system fonts
- Animations: Powered by Framer Motion
- Styling: Tailwind CSS utility classes

---

**Made with ❤️ and lots of ☕**

Enjoy playing BINGO Bonanza! 🎉🎊🎈

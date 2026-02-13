import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import Aurora from './Aurora';
import SplashCursor from './SplashCursor';

// Confetti component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: ['#A855F7', '#EC4899', '#F59E0B', '#4ECDC4', '#45B7D1', '#F7DC6F'][
      Math.floor(Math.random() * 6)
    ],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            top: '-10%',
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: '120vh',
            opacity: 0,
            rotate: piece.rotation,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};

// Name Entry Screen
const NameEntry = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl shadow-purple-900/30"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
            BINGO!
          </h1>
          <p className="text-xl text-gray-300">
            Let's get started! 🎉
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-lg font-semibold mb-2 text-gray-200">
              Enter Your Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-lg font-medium bg-gray-700/60 text-white border-2 border-gray-600 focus:border-purple-500 outline-none transition-colors backdrop-blur-sm"
              placeholder="Your name..."
              autoFocus
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Continue →
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Toast notification component
const Toast = ({ message, type = 'warning', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    warning: 'from-amber-500 to-orange-500 shadow-amber-500/30',
    error: 'from-red-500 to-rose-600 shadow-red-500/30',
    success: 'from-emerald-500 to-teal-600 shadow-emerald-500/30',
  };

  return (
    <motion.div
      className={`fixed top-6 left-1/2 z-[100] px-6 py-3 rounded-xl font-bold text-white text-base shadow-lg bg-gradient-to-r ${colors[type]} backdrop-blur-sm`}
      style={{ x: '-50%' }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {type === 'warning' && '⚠️ '}
      {type === 'error' && '❌ '}
      {type === 'success' && '✅ '}
      {message}
    </motion.div>
  );
};

// Number Input Screen
const NumberInput = ({ onComplete, playerName }) => {
  const [numbers, setNumbers] = useState(Array(25).fill(''));
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'warning') => {
    setToast({ message, type, id: Date.now() });
  };

  const handleNumberChange = (index, value) => {
    if (value === '') {
      const newNumbers = [...numbers];
      newNumbers[index] = '';
      setNumbers(newNumbers);
      return;
    }

    if (!/^\d+$/.test(value)) {
      showToast('Only numbers are allowed!', 'warning');
      return;
    }

    const num = parseInt(value, 10);

    if (num < 1 || num > 25) {
      showToast('Numbers must be between 1 and 25!', 'warning');
      return;
    }

    const duplicate = numbers.some((n, i) => i !== index && n !== '' && parseInt(n, 10) === num);
    if (duplicate) {
      showToast(`Number ${num} is already used!`, 'error');
      return;
    }

    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const fillRandom = () => {
    const pool = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setNumbers(pool.map(String));
    showToast('Board filled with numbers 1–25!', 'success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFilled = numbers.every((num) => num.toString().trim() !== '');
    if (!allFilled) {
      showToast('Please fill all the cells!', 'error');
      return;
    }

    const nums = numbers.map(n => parseInt(n, 10));
    if (nums.some(n => n < 1 || n > 25)) {
      showToast('All numbers must be between 1 and 25!', 'error');
      return;
    }

    if (new Set(nums).size !== 25) {
      showToast('All numbers must be unique!', 'error');
      return;
    }

    const tiles = numbers.map((number, i) => ({
      number: number,
      marked: false,
      row: Math.floor(i / 5),
      col: i % 5,
    }));

    onComplete(tiles);
  };

  // Find duplicate indices for red border
  const getDuplicateIndices = () => {
    const dupes = new Set();
    const seen = {};
    numbers.forEach((n, i) => {
      if (n === '') return;
      const val = parseInt(n, 10);
      if (seen[val] !== undefined) {
        dupes.add(seen[val]);
        dupes.add(i);
      } else {
        seen[val] = i;
      }
    });
    return dupes;
  };
  const duplicateIndices = getDuplicateIndices();

  return (
    <motion.div
      className="min-h-screen py-8 px-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
            Welcome, {playerName}! 👋
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Fill numbers 1–25 in your BINGO board
          </p>
          <motion.button
            type="button"
            onClick={fillRandom}
            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Fill Randomly 🎲
          </motion.button>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* BINGO Letters */}
          <motion.div
            className="grid grid-cols-5 gap-2 md:gap-4 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {['B', 'I', 'N', 'G', 'O'].map((letter) => (
              <div
                key={letter}
                className="text-center font-black text-3xl md:text-4xl text-yellow-400"
              >
                {letter}
              </div>
            ))}
          </motion.div>

          {/* Number Input Grid */}
          <motion.div
            className="grid grid-cols-5 gap-2 md:gap-3 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {numbers.map((num, index) => {
              const isDupe = duplicateIndices.has(index);
              return (
                <div key={index}>
                  <input
                    type="text"
                    value={num}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    className={`aspect-square w-full rounded-lg text-center font-bold text-lg md:text-xl bg-gray-800/60 backdrop-blur-sm text-white outline-none transition-all border-2 ${isDupe
                        ? 'border-red-500 shadow-red-500/30 shadow-md'
                        : 'border-gray-600 focus:border-purple-500'
                      }`}
                    placeholder={(index + 1).toString()}
                    maxLength={2}
                  />
                </div>
              );
            })}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Start Playing! 🎮
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

// BingoTile component
const BingoTile = ({ tile, onClick, isWinning, cursorPos }) => {
  const ref = useRef(null);
  const [tileCenter, setTileCenter] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!ref.current || !cursorPos) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTileCenter({ x: cx, y: cy });
    const dist = Math.sqrt((cursorPos.x - cx) ** 2 + (cursorPos.y - cy) ** 2);
    setIsNear(dist < 120);
  }, [cursorPos]);

  const getTilt = () => {
    if (!cursorPos || !isNear) return { rotateX: 0, rotateY: 0 };
    const dx = cursorPos.x - tileCenter.x;
    const dy = cursorPos.y - tileCenter.y;
    return {
      rotateY: dx * 0.08,
      rotateX: -dy * 0.08,
    };
  };

  const tilt = getTilt();

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`
        relative aspect-square rounded-xl font-bold text-lg sm:text-xl md:text-2xl
        cursor-pointer overflow-hidden text-white
        ${tile.marked
          ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
          : 'bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/60 border-2 border-gray-600/50'
        }
        ${isWinning ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-gray-900' : ''}
      `}
      style={{ perspective: 600 }}
      whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{
        delay: (tile.row * 5 + tile.col) * 0.02,
        type: 'spring',
        stiffness: 300,
        damping: 20,
        rotateX: { type: 'spring', stiffness: 150, damping: 15 },
        rotateY: { type: 'spring', stiffness: 150, damping: 15 },
      }}
    >
      {/* Cursor proximity glow */}
      {isNear && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.35) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          className="absolute w-[200%] h-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
            left: '-100%',
          }}
          animate={{ left: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
        />
      </motion.div>
      {/* Strike-through effect */}
      {tile.marked && (
        <>
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="text-3xl md:text-4xl">✓</div>
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-1 bg-white transform rotate-45 opacity-70" />
          </motion.div>
        </>
      )}
      <span className={tile.marked ? 'opacity-40 relative z-20' : 'relative z-20'}>
        {tile.number}
      </span>
    </motion.button>
  );
};

// WinModal component
const WinModal = ({ onNewGame, playerName }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showConfetti && <Confetti />}

      <motion.div
        className="bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-yellow-400 shadow-yellow-400/20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          >
            🎉
          </motion.div>

          <h2 className="text-6xl font-black mb-4 text-yellow-400">
            BINGO!
          </h2>

          <p className="text-2xl font-bold mb-6 text-purple-400">
            Congratulations, {playerName}! 🏆
          </p>

          <p className="text-lg mb-8 text-gray-300">
            You completed all 5 strikes and won!
          </p>

          <motion.button
            onClick={onNewGame}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again! 🎮
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Sparkle particle that spawns on click
const SparkleParticle = ({ x, y, onComplete }) => {
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 50;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;
  const size = 4 + Math.random() * 6;
  const color = ['#A855F7', '#EC4899', '#F59E0B', '#4ECDC4', '#45B7D1'][
    Math.floor(Math.random() * 5)
  ];

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: 0,
        x: tx,
        y: ty,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
    />
  );
};

// BingoBoard component with cursor tracking
const BingoBoard = ({ tiles, onTileClick, winningTiles }) => {
  const boardRef = useRef(null);
  const [cursorPos, setCursorPos] = useState(null);
  const [sparkles, setSparkles] = useState([]);
  const sparkleIdRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPos(null);
  }, []);

  const handleTileClickWithSparkle = useCallback((index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const newSparkles = Array.from({ length: 8 }, () => ({
      id: sparkleIdRef.current++,
      x: cx,
      y: cy,
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
    onTileClick(index);
  }, [onTileClick]);

  const removeSparkle = useCallback((id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <div
      ref={boardRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto">
        {tiles.map((tile, index) => (
          <BingoTile
            key={index}
            tile={tile}
            onClick={(e) => handleTileClickWithSparkle(index, e)}
            isWinning={winningTiles.includes(index)}
            cursorPos={cursorPos}
          />
        ))}
      </div>
      {/* Click sparkles */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <SparkleParticle
            key={sparkle.id}
            x={sparkle.x}
            y={sparkle.y}
            onComplete={() => removeSparkle(sparkle.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Main App component
const App = () => {
  const [gameState, setGameState] = useState('name'); // 'name', 'input', 'playing', 'won'
  const [playerName, setPlayerName] = useState('');
  const [tiles, setTiles] = useState([]);
  const [completedStrikes, setCompletedStrikes] = useState([]);
  const [winningTiles, setWinningTiles] = useState([]);

  // Check for completed lines (strikes)
  const checkStrikes = (currentTiles) => {
    const strikes = [];
    const board = [];
    for (let i = 0; i < 5; i++) {
      board[i] = currentTiles.slice(i * 5, i * 5 + 5);
    }

    // Check rows
    for (let row = 0; row < 5; row++) {
      if (board[row].every((tile) => tile.marked)) {
        strikes.push({ type: 'row', index: row, tiles: board[row].map((_, col) => row * 5 + col) });
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      if (board.every((row) => row[col].marked)) {
        strikes.push({ type: 'col', index: col, tiles: board.map((_, row) => row * 5 + col) });
      }
    }

    // Check diagonals
    if (board.every((row, i) => row[i].marked)) {
      strikes.push({ type: 'diag', index: 0, tiles: [0, 6, 12, 18, 24] });
    }
    if (board.every((row, i) => row[4 - i].marked)) {
      strikes.push({ type: 'diag', index: 1, tiles: [4, 8, 12, 16, 20] });
    }

    return strikes;
  };

  const handleTileClick = (index) => {
    if (gameState !== 'playing') return;

    const newTiles = [...tiles];
    newTiles[index].marked = !newTiles[index].marked;
    setTiles(newTiles);

    const strikes = checkStrikes(newTiles);
    setCompletedStrikes(strikes);

    const allWinningTiles = strikes.flatMap(s => s.tiles);
    setWinningTiles(allWinningTiles);

    if (strikes.length >= 5) {
      setTimeout(() => {
        setGameState('won');
      }, 500);
    }
  };

  const handleNameSubmit = (name) => {
    setPlayerName(name);
    setGameState('input');
  };

  const handleNumbersComplete = (gameTiles) => {
    setTiles(gameTiles);
    setGameState('playing');
  };

  const handleNewGame = () => {
    setGameState('input');
    setTiles([]);
    setCompletedStrikes([]);
    setWinningTiles([]);
  };

  // Get BINGO letter status
  const getBingoLetterStatus = () => {
    const letters = ['B', 'I', 'N', 'G', 'O'];
    return letters.map((letter, i) => completedStrikes.length > i);
  };

  const bingoStatus = getBingoLetterStatus();

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Aurora Background */}
      <Aurora
        colorStops={['#A855F7', '#EC4899', '#6366F1']}
        amplitude={1.2}
        blend={0.6}
        speed={0.8}
      />

      {/* SplashCursor effect */}
      <SplashCursor
        DENSITY_DISSIPATION={3}
        VELOCITY_DISSIPATION={1.5}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={5000}
        CURL={5}
        COLOR_UPDATE_SPEED={8}
        BACK_COLOR={{ r: 0, g: 0, b: 0 }}
        TRANSPARENT={true}
      />

      {/* Content */}
      {gameState === 'name' && (
        <NameEntry onSubmit={handleNameSubmit} />
      )}

      {gameState === 'input' && (
        <NumberInput onComplete={handleNumbersComplete} playerName={playerName} />
      )}

      {gameState === 'playing' && (
        <div className="relative z-10 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
                {playerName}'s BINGO Game! 🎮
              </h1>
              <p className="text-lg text-gray-300">
                Complete 5 strikes to spell BINGO and win!
              </p>
            </motion.div>

            {/* BINGO Letters with Status */}
            <motion.div
              className="grid grid-cols-5 gap-2 sm:gap-4 max-w-2xl mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              {['B', 'I', 'N', 'G', 'O'].map((letter, i) => (
                <motion.div
                  key={letter}
                  className={`text-center font-black text-3xl sm:text-4xl md:text-5xl p-4 rounded-lg transition-all duration-500 ${bingoStatus[i]
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                    : 'text-gray-500'
                    }`}
                  animate={bingoStatus[i] ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  {letter}
                </motion.div>
              ))}
            </motion.div>

            {/* Strike Counter */}
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="inline-block px-6 py-3 rounded-full font-bold text-xl bg-gray-800/60 backdrop-blur-sm text-purple-400 border-2 border-purple-500/50">
                Strikes: {completedStrikes.length} / 5 ⚡
              </div>
            </motion.div>

            {/* Bingo Board */}
            <BingoBoard
              tiles={tiles}
              onTileClick={handleTileClick}
              winningTiles={winningTiles}
            />

            {/* Controls */}
            <motion.div
              className="flex justify-center items-center mt-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={handleNewGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                New Game 🎲
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}

      {/* Win Modal */}
      <AnimatePresence>
        {gameState === 'won' && (
          <WinModal
            onNewGame={handleNewGame}
            playerName={playerName}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

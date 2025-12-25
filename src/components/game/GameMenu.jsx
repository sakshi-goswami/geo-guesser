import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Zap, Skull, Trophy, Play, Map } from 'lucide-react';
import { Button } from '../ui/button';

const GameMenu = ({ onStart, onLeaderboard }) => {
  const [mode, setMode] = useState('classic');
  const [difficulty, setDifficulty] = useState('medium');

  const modes = [
    { 
      id: 'classic', 
      name: 'Classic', 
      icon: Globe2, 
      desc: '5 rounds, explore at your own pace.', 
      color: 'text-blue-400',
      bg: 'bg-blue-400/10 border-blue-400/20'
    },
    { 
      id: 'speed', 
      name: 'Speed Run', 
      icon: Zap, 
      desc: 'Race against a global timer!', 
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10 border-yellow-400/20'
    },
    { 
      id: 'survival', 
      name: 'Survival', 
      icon: Skull, 
      desc: 'One life. Don\'t miss by > 2000km.', 
      color: 'text-red-400',
      bg: 'bg-red-400/10 border-red-400/20'
    }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', multiplier: '0.8x', timer: '+Time' },
    { id: 'medium', name: 'Medium', multiplier: '1.0x', timer: 'Normal' },
    { id: 'hard', name: 'Hard', multiplier: '1.5x', timer: '-Time' },
  ];

  const handleStart = () => {
    // Ensure we're passing the current state
    onStart({ mode, difficulty });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full">
        {/* Title Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="bg-emerald-500/20 p-4 rounded-2xl animate-float">
              <Map className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              GEOGUESSR
            </h1>
          </motion.div>
          <p className="text-slate-400 text-lg">Explore the world, test your knowledge.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Game Configuration */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8 bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl"
          >
            {/* Mode Selection */}
            <div>
              <h3 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Select Game Mode
              </h3>
              <div className="space-y-3">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all duration-200 group relative z-10
                      ${mode === m.id 
                        ? `${m.bg} ring-1 ring-inset ring-white/10` 
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                      }`}
                  >
                    <div className={`p-2 rounded-lg bg-slate-950/50 ${m.color}`}>
                      <m.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${mode === m.id ? 'text-white' : 'text-slate-200'}`}>
                        {m.name}
                      </div>
                      <div className="text-xs text-slate-400">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <h3 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                Select Difficulty
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDifficulty(d.id)}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 relative z-10
                      ${difficulty === d.id 
                        ? 'bg-purple-500/20 border-purple-500/50 text-white' 
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                      }`}
                  >
                    <div className="font-bold">{d.name}</div>
                    <div className="text-xs opacity-60 mt-1">{d.timer}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Panel */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Globe2 className="w-24 h-24 text-slate-700 mb-6 group-hover:text-emerald-500/20 transition-colors duration-500" />
              <h2 className="text-2xl font-bold text-white mb-2">Ready to explore?</h2>
              <p className="text-slate-400 mb-8 max-w-xs">
                Challenge yourself across 5 rounds of geography trivia.
              </p>
              
              <Button 
                size="lg" 
                onClick={handleStart}
                className="w-full max-w-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg h-14 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all relative z-20"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                START GAME
              </Button>
            </div>

            <button 
              onClick={onLeaderboard}
              className="bg-slate-800/50 hover:bg-slate-800 p-6 rounded-3xl border border-slate-700 transition-all flex items-center justify-between group relative z-10"
            >
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-xl text-yellow-400">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white group-hover:text-yellow-400 transition-colors">Leaderboard</div>
                  <div className="text-sm text-slate-400">View top explorers</div>
                </div>
              </div>
              <div className="text-slate-500 group-hover:translate-x-1 transition-transform">→</div>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameMenu;
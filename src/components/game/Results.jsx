import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Save, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input'; // Assuming standard input or will use HTML input

const Results = ({ results, config, onRestart, onMenu, onLeaderboard }) => {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);

  const { score, rounds, reason } = results;
  
  // Calculate stats
  const avgDistance = Math.round(rounds.reduce((acc, r) => acc + r.distance, 0) / rounds.length);
  const accuracy = Math.max(0, 100 - (avgDistance / 200)); // Rough percentage

  const handleSaveScore = () => {
    if (!playerName.trim()) return;

    const newScore = {
      name: playerName,
      score: score,
      mode: config.mode,
      difficulty: config.difficulty,
      date: new Date().toISOString()
    };

    const currentScores = JSON.parse(localStorage.getItem('geo_scores') || '[]');
    const updatedScores = [...currentScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    localStorage.setItem('geo_scores', JSON.stringify(updatedScores));
    setSaved(true);
    setTimeout(onLeaderboard, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Game Over</h2>
          <p className="text-emerald-100 font-medium opacity-90">{reason || 'Great game!'}</p>
        </div>

        <div className="p-8">
          {/* Main Score Display */}
          <div className="text-center mb-8">
            <div className="text-slate-400 text-sm uppercase tracking-wider mb-2">Total Score</div>
            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
              {score.toLocaleString()}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">ROUNDS</div>
              <div className="text-xl font-bold text-white">{rounds.length}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">AVG DIST</div>
              <div className="text-xl font-bold text-white">{avgDistance}km</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">ACCURACY</div>
              <div className="text-xl font-bold text-emerald-400">{Math.round(accuracy)}%</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700">
              <div className="text-xs text-slate-500 mb-1">MODE</div>
              <div className="text-xl font-bold text-blue-400 capitalize">{config.mode}</div>
            </div>
          </div>

          {/* Save Score */}
          {!saved ? (
            <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700 mb-8">
              <h3 className="text-white font-semibold mb-4">Save to Leaderboard</h3>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <Button onClick={handleSaveScore} className="bg-emerald-500 hover:bg-emerald-600">
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 mb-8 text-center text-emerald-400 flex items-center justify-center gap-2">
              <Check className="w-5 h-5" /> Score Saved Successfully!
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={onMenu} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
              <Home className="w-5 h-5 mr-2" /> Menu
            </Button>
            <Button size="lg" onClick={onRestart} className="bg-blue-600 hover:bg-blue-500 text-white min-w-[150px]">
              <RotateCcw className="w-5 h-5 mr-2" /> Play Again
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
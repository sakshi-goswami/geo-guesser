import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Medal, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

const Leaderboard = ({ onBack }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('geo_scores') || '[]');
    setScores(saved);
  }, []);

  const getMedalColor = (index) => {
    switch(index) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-slate-300';
      case 2: return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto"
    >
      <Button variant="ghost" onClick={onBack} className="mb-8 hover:bg-slate-800 text-slate-400 hover:text-white">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Menu
      </Button>

      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/20 p-3 rounded-xl">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Hall of Fame</h1>
              <p className="text-slate-400">Top explorers from around the globe</p>
            </div>
          </div>
        </div>

        <div className="p-0">
          {scores.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No scores recorded yet. Be the first!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/30 text-slate-400 text-sm uppercase tracking-wider">
                    <th className="p-6 font-medium">Rank</th>
                    <th className="p-6 font-medium">Player</th>
                    <th className="p-6 font-medium">Score</th>
                    <th className="p-6 font-medium">Mode</th>
                    <th className="p-6 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((entry, idx) => (
                    <motion.tr 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          {idx < 3 ? (
                            <Medal className={`w-6 h-6 ${getMedalColor(idx)}`} />
                          ) : (
                            <span className="text-slate-500 w-6 text-center font-mono">{idx + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {entry.name}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">
                          {entry.score.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium capitalize text-slate-300">{entry.mode}</span>
                          <span className="text-xs text-slate-500 capitalize">{entry.difficulty}</span>
                        </div>
                      </td>
                      <td className="p-6 text-right text-slate-500 text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
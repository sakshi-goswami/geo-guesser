import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const ScoreCard = ({ score }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-slate-900/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-slate-700 flex items-center gap-3"
    >
      <Trophy className="w-5 h-5 text-yellow-400" />
      <div>
        <p className="text-xs text-slate-400">Total Score</p>
        <p className="text-xl font-bold text-white">{score.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default ScoreCard;
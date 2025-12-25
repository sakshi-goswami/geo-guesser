import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const LocationView = ({ location, showAnswer }) => {
  if (!location) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Location Image */}
      <img
        src={location.imageUrl}
        alt={showAnswer ? location.name : 'Mystery location'}
        className="w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

      {/* Location info (shown after guess) */}
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <span className="text-2xl font-bold text-white block">{location.name}</span>
              <p className="text-slate-300 mt-1">{location.description}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Corner hint (only during playing) */}
      {!showAnswer && (
        <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700">
          <p className="text-slate-300 text-sm">📍 Where in the world is this?</p>
        </div>
      )}
    </div>
  );
};

export default LocationView;
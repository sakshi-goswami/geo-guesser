import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationView from './LocationView';
import MapView from './MapView';
import ScoreCard from './ScoreCard';
import { Button } from '../ui/button';
import { MapPin, Timer, AlertTriangle, LogOut, ArrowRight } from 'lucide-react';
import { locations } from '../../data/locations';
import { calculateDistance, calculateScore } from '../../utils/gameLogic';
import { useToast } from '../ui/use-toast';

const GameScreen = ({ config, onFinish, onExit }) => {
  const { mode = 'classic', difficulty = 'medium' } = config || {};
  const { toast } = useToast();

  // Game Constants based on Difficulty
  const getRoundTime = () => {
    if (mode === 'speed') return 300; // 5 min global timer for speed run
    switch(difficulty) {
      case 'easy': return 120;
      case 'hard': return 30;
      default: return 60;
    }
  };

  const getScoreMultiplier = () => {
    switch(difficulty) {
      case 'easy': return 0.8;
      case 'hard': return 1.5;
      default: return 1.0;
    }
  };

  const TOTAL_ROUNDS = mode === 'survival' ? Infinity : 5;
  const SURVIVAL_TOLERANCE = difficulty === 'easy' ? 3000 : difficulty === 'medium' ? 2000 : 1000;

  // State
  const [gameState, setGameState] = useState('playing'); // 'playing', 'guessed'
  const [round, setRound] = useState(1);
  const [currentLoc, setCurrentLoc] = useState(null);
  const [guessedPos, setGuessedPos] = useState(null);
  const [roundHistory, setRoundHistory] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getRoundTime());
  const [isRunning, setIsRunning] = useState(true);
  
  // Initialize first round
  useEffect(() => {
    if (locations && locations.length > 0) {
      selectRandomLocation();
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    if (!isRunning || gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (mode === 'speed') {
            finishGame('Time Up!');
            return 0;
          } else {
            // Round time up
            handleConfirmGuess(null, true); // Auto-submit null guess
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, gameState, mode]);

  const selectRandomLocation = () => {
    if (!locations || locations.length === 0) return;
    
    // Basic random selection - in a real app, filtering by difficulty would happen here
    const random = locations[Math.floor(Math.random() * locations.length)];
    setCurrentLoc(random);
    
    // Reset timer only for non-speed modes
    if (mode !== 'speed') {
      setTimeLeft(getRoundTime());
    }
    setIsRunning(true);
  };

  const finishGame = useCallback((reason = '') => {
    setIsRunning(false);
    onFinish({
      score: totalScore,
      rounds: roundHistory,
      config,
      reason
    });
  }, [totalScore, roundHistory, config, onFinish]);

  const handleConfirmGuess = (manualGuess = guessedPos, timeUp = false) => {
    setIsRunning(false);
    
    let distance = 20000; // Max distance default
    let points = 0;

    if (manualGuess && currentLoc) {
      distance = calculateDistance(
        currentLoc.lat, 
        currentLoc.lng, 
        manualGuess.lat, 
        manualGuess.lng
      );
      
      const baseScore = calculateScore(distance);
      points = Math.round(baseScore * getScoreMultiplier());
    }

    const roundResult = {
      round,
      location: currentLoc,
      guess: manualGuess,
      distance: Math.round(distance),
      score: points,
      timeRemaining: timeLeft
    };

    const newHistory = [...roundHistory, roundResult];
    setRoundHistory(newHistory);
    setTotalScore(prev => prev + points);
    setGameState('guessed');

    // Survival Mode Check
    if (mode === 'survival') {
      if (distance > SURVIVAL_TOLERANCE || timeUp) {
        toast({
          variant: "destructive",
          title: "Game Over!",
          description: `Distance ${Math.round(distance)}km exceeded limit of ${SURVIVAL_TOLERANCE}km.`
        });
        setTimeout(() => finishGame('Survival Failed'), 2000);
        return;
      }
    }

    // Classic/Speed Check Last Round
    if (mode !== 'survival' && round >= TOTAL_ROUNDS) {
      // Don't finish immediately, let them see the result
    }
  };

  const handleNext = () => {
    if (mode !== 'survival' && round >= TOTAL_ROUNDS) {
      finishGame('Complete');
      return;
    }
    
    setRound(prev => prev + 1);
    setGuessedPos(null);
    setGameState('playing');
    selectRandomLocation();
  };

  // Timer Color
  const getTimerColor = () => {
    if (timeLeft > 30) return 'text-emerald-400';
    if (timeLeft > 10) return 'text-yellow-400';
    return 'text-red-500 animate-pulse';
  };

  if (!locations || locations.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Error Loading Game Data</h2>
          <p className="text-slate-400 mt-2">Could not load location data. Please refresh the page.</p>
          <Button onClick={onExit} className="mt-6" variant="outline">Back to Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col bg-slate-900"
    >
      {/* HUD Header */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-700 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-red-500/10 hover:text-red-400">
              <LogOut className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-bold text-white flex items-center gap-2">
                {mode === 'survival' ? 'SURVIVAL MODE' : `ROUND ${round} / ${TOTAL_ROUNDS}`}
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 uppercase">{difficulty}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
             {/* Timer */}
             <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <Timer className={`w-5 h-5 ${getTimerColor()}`} />
              <span className={`font-mono text-xl font-bold ${getTimerColor()}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            
            <ScoreCard score={totalScore} />
          </div>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left: Panorama */}
        <div className="lg:w-1/2 h-1/2 lg:h-full relative border-r border-slate-800">
          <LocationView location={currentLoc} showAnswer={gameState === 'guessed'} />
        </div>

        {/* Right: Map */}
        <div className="lg:w-1/2 h-1/2 lg:h-full relative z-0">
          <MapView 
            guessedPosition={guessedPos}
            setGuessedPosition={setGuessedPos}
            actualPosition={gameState === 'guessed' ? currentLoc : null}
            disabled={gameState !== 'playing'}
          />
        </div>

        {/* Action Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
           <AnimatePresence mode="wait">
            {gameState === 'playing' ? (
              <motion.div
                key="confirm"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <Button 
                  onClick={() => handleConfirmGuess()} 
                  disabled={!guessedPos}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold text-lg h-14 rounded-xl shadow-lg disabled:opacity-50 transition-all"
                >
                  <MapPin className="mr-2 w-5 h-5" /> CONFIRM GUESS
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="next"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 shadow-2xl text-center"
              >
                <div className="mb-4">
                  <div className="text-3xl font-black text-emerald-400 mb-1">
                    +{roundHistory[roundHistory.length-1]?.score} PTS
                  </div>
                  <div className="text-slate-400 flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    {roundHistory[roundHistory.length-1]?.distance} km away
                  </div>
                </div>
                <Button 
                  onClick={handleNext} 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold h-12 rounded-xl"
                >
                  {mode !== 'survival' && round >= TOTAL_ROUNDS ? 'VIEW RESULTS' : 'NEXT ROUND'} 
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GameScreen;
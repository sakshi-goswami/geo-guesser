import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AnimatePresence, motion } from 'framer-motion';
import GameScreen from './components/game/GameScreen';
import GameMenu from './components/game/GameMenu';
import Results from './components/game/Results';
import Leaderboard from './components/game/Leaderboard';
import { Toaster } from './components/ui/toaster';

function App() {
  const [screen, setScreen] = useState('menu'); // menu, game, results, leaderboard
  const [gameConfig, setGameConfig] = useState({
    mode: 'classic', // classic, speed, survival
    difficulty: 'medium' // easy, medium, hard
  });
  const [lastGameResults, setLastGameResults] = useState(null);

  const startGame = (config) => {
    setGameConfig(config);
    setScreen('game');
  };

  const finishGame = (results) => {
    setLastGameResults(results);
    setScreen('results');
  };

  const navigateTo = (target) => {
    setScreen(target);
  };

  return (
    <>
      <Helmet>
        <title>GeoGuessr Ultimate - Explore the World</title>
        <meta name="description" content="Test your geography knowledge in Classic, Speed Run, or Survival modes. Climb the leaderboards!" />
      </Helmet>
      
      <div className="min-h-screen bg-slate-950 bg-grid-pattern relative overflow-hidden text-slate-100">
        {/* Background Ambient Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {screen === 'menu' && (
              <GameMenu key="menu" onStart={startGame} onLeaderboard={() => navigateTo('leaderboard')} />
            )}
            
            {screen === 'game' && (
              <GameScreen 
                key="game" 
                config={gameConfig} 
                onFinish={finishGame} 
                onExit={() => navigateTo('menu')}
              />
            )}
            
            {screen === 'results' && (
              <Results 
                key="results" 
                results={lastGameResults} 
                config={gameConfig}
                onRestart={() => startGame(gameConfig)}
                onMenu={() => navigateTo('menu')}
                onLeaderboard={() => navigateTo('leaderboard')}
              />
            )}

            {screen === 'leaderboard' && (
              <Leaderboard 
                key="leaderboard" 
                onBack={() => navigateTo('menu')} 
              />
            )}
          </AnimatePresence>
        </div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;
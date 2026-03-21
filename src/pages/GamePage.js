import React, { useEffect } from 'react';
import Board from '../components/Board';
import { useGame } from '../context/GameContext';
import './GamePage.css';

function GamePage({ mode }) {
  const { startNewGame, resetGame, getHint, isComplete, timer, tick, mode: currentMode, board } = useGame();

  // start a new game when the page loads or mode changes
  // but only if there's no saved game for this mode
  useEffect(() => {
    if (currentMode !== mode || board.length === 0) {
      startNewGame(mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // timer effect
  useEffect(() => {
    if (!currentMode || isComplete) return;
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMode, isComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleNewGame = () => {
    startNewGame(mode);
  };

  const handleReset = () => {
    resetGame();
  };

  const handleHint = () => {
    getHint();
  };

  const title = mode === 'easy' ? 'Easy Game' : 'Normal Game';
  const subtitle = mode === 'easy' ? '6x6 Grid — Perfect for beginners' : '9x9 Grid — The classic challenge';

  return (
    <main className="page-container">
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>

      <div className="game-header">
        <div className="game-info-bar">
          <span className="difficulty-label">
            Difficulty: <span className={`difficulty-value ${mode === 'easy' ? 'easy' : ''}`}>
              {mode === 'easy' ? 'Easy' : 'Normal'}
            </span>
          </span>
        </div>
        <div className="timer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={mode === 'easy' ? 'var(--success)' : 'var(--accent)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
          <span className="timer-display">{formatTime(timer)}</span>
        </div>
      </div>

      {isComplete && (
        <div className="congrats-message">
          Congratulations! You solved the puzzle in {formatTime(timer)}!
        </div>
      )}

      <Board />

      <div className="game-controls">
        <div className="game-actions">
          <button className="btn btn-outline" onClick={handleNewGame}>New Game</button>
          <button className="btn btn-outline" onClick={handleReset}>Reset</button>
          {!isComplete && (
            <button className="btn btn-accent" onClick={handleHint}>Hint</button>
          )}
        </div>
      </div>
    </main>
  );
}

export default GamePage;

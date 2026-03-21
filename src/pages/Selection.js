import React from 'react';
import { Link } from 'react-router-dom';
import './Selection.css';

// mock hardcoded data for game selection
const games = [
  { id: 1, name: 'Sunday Challenge', author: 'Alex Chen', difficulty: 'hard', size: '9x9', time: '~25 min', link: '/games/normal' },
  { id: 2, name: 'Mind Bender', author: 'Maria Santos', difficulty: 'hard', size: '9x9', time: '~30 min', link: '/games/normal' },
  { id: 3, name: 'The Impossible', author: 'James Wilson', difficulty: 'hard', size: '9x9', time: '~40 min', link: '/games/normal' },
  { id: 4, name: 'Quick Solve', author: 'Sarah Park', difficulty: 'medium', size: '9x9', time: '~15 min', link: '/games/normal' },
  { id: 5, name: 'Daily Puzzle #42', author: 'David Kim', difficulty: 'medium', size: '6x6', time: '~18 min', link: '/games/easy' },
  { id: 6, name: "Beginner's Luck", author: 'Emily Brown', difficulty: 'easy', size: '6x6', time: '~10 min', link: '/games/easy' },
];

function Selection() {
  return (
    <main className="page-container">
      <h1 className="page-title">Select a Game</h1>
      <p className="page-subtitle">Choose a puzzle to solve. Click any game to start playing.</p>

      <div className="game-list">
        {games.map((game) => (
          <Link to={game.link} key={game.id} className="game-card card">
            <div className="game-info">
              <h2 className="game-name">{game.name}</h2>
              <p className="game-author">by <span className="author-name">{game.author}</span></p>
            </div>
            <div className="game-meta">
              <span className={`difficulty-badge ${game.difficulty}`}>{game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)} {game.size}</span>
              <span className="game-time">{game.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Selection;

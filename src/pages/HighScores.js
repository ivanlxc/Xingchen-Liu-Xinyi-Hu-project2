import React from 'react';
import './HighScores.css';

// mock hardcoded data
const scores = [
  { rank: 1, username: 'PuzzleKing', puzzles: 342, bestTime: '3:21', avgTime: '5:44' },
  { rank: 2, username: 'SudokuPro99', puzzles: 289, bestTime: '3:45', avgTime: '6:12' },
  { rank: 3, username: 'NumberNinja', puzzles: 256, bestTime: '4:02', avgTime: '6:38' },
  { rank: 4, username: 'GridMaster', puzzles: 198, bestTime: '4:33', avgTime: '7:15' },
  { rank: 5, username: 'BrainTeaser', puzzles: 175, bestTime: '4:51', avgTime: '7:42' },
  { rank: 6, username: 'LogicLord', puzzles: 163, bestTime: '5:12', avgTime: '8:05' },
  { rank: 7, username: 'CellSolver', puzzles: 147, bestTime: '5:28', avgTime: '8:33' },
  { rank: 8, username: 'MathWhiz', puzzles: 132, bestTime: '5:44', avgTime: '8:57' },
  { rank: 9, username: 'PuzzleNoob', puzzles: 98, bestTime: '6:15', avgTime: '9:44' },
  { rank: 10, username: 'NewPlayer1', puzzles: 42, bestTime: '8:32', avgTime: '12:18' },
];

function getRankClass(rank) {
  if (rank === 1) return 'rank-gold';
  if (rank === 2) return 'rank-silver';
  if (rank === 3) return 'rank-bronze';
  return '';
}

function HighScores() {
  return (
    <main className="page-container">
      <h1 className="page-title">High Scores</h1>
      <p className="page-subtitle">Top Sudoku players on the leaderboard</p>

      <div className="scores-wrapper">
        <table className="scores-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Puzzles</th>
              <th>Best Time</th>
              <th>Avg Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((player) => (
              <tr key={player.rank}>
                <td>
                  <span className={`rank-badge ${getRankClass(player.rank)}`}>{player.rank}</span>
                </td>
                <td className="username">{player.username}</td>
                <td>{player.puzzles}</td>
                <td>{player.bestTime}</td>
                <td>{player.avgTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default HighScores;

import React from 'react';
import { useGame } from '../context/GameContext';

// Cell receives props from parent Board component
function Cell({ row, col, value, isGiven, isError, isComplete, isHint }) {
  const { setCellValue, mode } = useGame();
  const maxVal = mode === 'easy' ? 6 : 9;

  const handleChange = (e) => {
    const input = e.target.value;
    if (input === '') {
      setCellValue(row, col, 0);
      return;
    }
    const num = parseInt(input, 10);
    // only allow valid range
    if (num >= 1 && num <= maxVal) {
      setCellValue(row, col, num);
    }
  };

  if (isGiven) {
    return (
      <div className="cell cell-given">
        {value}
      </div>
    );
  }

  if (isComplete && value !== 0) {
    return (
      <div className={`cell cell-player ${isError ? 'cell-error' : ''}`}>
        {value}
      </div>
    );
  }

  const cellClass = `cell cell-empty ${isError ? 'cell-error' : ''} ${isHint ? 'cell-hint' : ''}`;

  return (
    <div className={cellClass}>
      <input
        type="number"
        min="1"
        max={maxVal}
        className="cell-input"
        value={value === 0 ? '' : value}
        onChange={handleChange}
        disabled={isComplete}
      />
    </div>
  );
}

export default Cell;

import React from 'react';
import Cell from './Cell';
import { useGame } from '../context/GameContext';

function Board() {
  const { board, initialBoard, errors, mode, isComplete, hintCell } = useGame();
  const size = mode === 'easy' ? 6 : 9;
  const boxRows = size === 6 ? 2 : 3;
  const boxCols = size === 6 ? 3 : 3;
  const numBoxRow = size / boxRows; // number of subgrid rows
  const numBoxCol = size / boxCols; // number of subgrid cols

  if (board.length === 0) return null;

  // build subgrids
  const subgrids = [];
  for (let br = 0; br < numBoxRow; br++) {
    for (let bc = 0; bc < numBoxCol; bc++) {
      const cells = [];
      for (let r = br * boxRows; r < (br + 1) * boxRows; r++) {
        for (let c = bc * boxCols; c < (bc + 1) * boxCols; c++) {
          cells.push(
            <Cell
              key={`${r}-${c}`}
              row={r}
              col={c}
              value={board[r][c]}
              isGiven={initialBoard[r][c] !== 0}
              isError={errors[r][c]}
              isComplete={isComplete}
              isHint={hintCell && hintCell.row === r && hintCell.col === c}
            />
          );
        }
      }
      const subgridClass = size === 6 ? 'subgrid subgrid-3x2' : 'subgrid subgrid-3x3';
      subgrids.push(
        <div key={`${br}-${bc}`} className={subgridClass}>
          {cells}
        </div>
      );
    }
  }

  const boardClass = size === 6 ? 'sudoku-board sudoku-board-6' : 'sudoku-board sudoku-board-9';

  return (
    <div className={boardClass}>
      {subgrids}
    </div>
  );
}

export default Board;

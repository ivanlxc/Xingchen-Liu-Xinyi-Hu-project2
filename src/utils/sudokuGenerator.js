// generate a completed sudoku board using backtracking
function generateCompleteBoard(size) {
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  const boxRows = size === 6 ? 2 : 3;
  const boxCols = size === 6 ? 3 : 3;

  function isValid(board, row, col, num) {
    for (let c = 0; c < size; c++) {
      if (board[row][c] === num) return false;
    }
    for (let r = 0; r < size; r++) {
      if (board[r][col] === num) return false;
    }
    const startRow = Math.floor(row / boxRows) * boxRows;
    const startCol = Math.floor(col / boxCols) * boxCols;
    for (let r = startRow; r < startRow + boxRows; r++) {
      for (let c = startCol; c < startCol + boxCols; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  }

  function solve(board) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          const nums = shuffle(Array.from({ length: size }, (_, i) => i + 1));
          for (let num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve(board);
  return board;
}

// fisher-yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// counts how many solutions a puzzle has, stops at maxCount
function countSolutions(puzzle, size, maxCount) {
  const board = puzzle.map(row => [...row]);
  const boxRows = size === 6 ? 2 : 3;
  const boxCols = size === 6 ? 3 : 3;
  let count = 0;

  function isValid(row, col, num) {
    for (let c = 0; c < size; c++) {
      if (board[row][c] === num) return false;
    }
    for (let r = 0; r < size; r++) {
      if (board[r][col] === num) return false;
    }
    const sr = Math.floor(row / boxRows) * boxRows;
    const sc = Math.floor(col / boxCols) * boxCols;
    for (let r = sr; r < sr + boxRows; r++) {
      for (let c = sc; c < sc + boxCols; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  }

  function solve() {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(row, col, num)) {
              board[row][col] = num;
              solve();
              if (count >= maxCount) return; // stop early
              board[row][col] = 0;
            }
          }
          return; // no valid number found, backtrack
        }
      }
    }
    // all cells filled = found a solution
    count++;
  }

  solve();
  return count;
}

// remove cells but make sure there's still only one solution
function createUniquePuzzle(solution, cellsToKeep) {
  const size = solution.length;
  const puzzle = solution.map(row => [...row]);
  const totalCells = size * size;
  const cellsToRemove = totalCells - cellsToKeep;

  const positions = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      positions.push([r, c]);
    }
  }
  const shuffled = shuffle(positions);

  let removed = 0;
  for (let i = 0; i < shuffled.length && removed < cellsToRemove; i++) {
    const [r, c] = shuffled[i];
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;

    // check if puzzle still has a unique solution
    if (countSolutions(puzzle, size, 2) !== 1) {
      // more than one solution, put the number back
      puzzle[r][c] = backup;
    } else {
      removed++;
    }
  }

  return puzzle;
}

// find an empty cell with only one possible number, return it or null
export function findHint(board, initialBoard, size) {
  const boxRows = size === 6 ? 2 : 3;
  const boxCols = size === 6 ? 3 : 3;

  const hintCells = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      // skip given cells and already filled cells
      if (initialBoard[row][col] !== 0 || board[row][col] !== 0) continue;

      // find all valid candidates for this cell
      const candidates = [];
      for (let num = 1; num <= size; num++) {
        let valid = true;

        // check row
        for (let c = 0; c < size; c++) {
          if (board[row][c] === num) { valid = false; break; }
        }
        if (!valid) continue;

        // check column
        for (let r = 0; r < size; r++) {
          if (board[r][col] === num) { valid = false; break; }
        }
        if (!valid) continue;

        // check subgrid
        const sr = Math.floor(row / boxRows) * boxRows;
        const sc = Math.floor(col / boxCols) * boxCols;
        for (let r = sr; r < sr + boxRows; r++) {
          for (let c = sc; c < sc + boxCols; c++) {
            if (board[r][c] === num) { valid = false; break; }
          }
          if (!valid) break;
        }

        if (valid) candidates.push(num);
      }

      // if exactly one candidate, this cell can be hinted
      if (candidates.length === 1) {
        hintCells.push({ row, col, value: candidates[0] });
      }
    }
  }

  if (hintCells.length === 0) return null;
  // return a random one from the available hints
  return hintCells[Math.floor(Math.random() * hintCells.length)];
}

export function generateSudoku(mode) {
  const size = mode === 'easy' ? 6 : 9;
  const cellsToKeep = mode === 'easy' ? 18 : 28 + Math.floor(Math.random() * 3);

  const solution = generateCompleteBoard(size);
  // use backtracking to ensure unique solution
  const puzzle = createUniquePuzzle(solution, cellsToKeep);

  return { solution, puzzle };
}

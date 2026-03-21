import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { generateSudoku, findHint } from '../utils/sudokuGenerator';

const GameContext = createContext();

const STORAGE_KEY = 'sudoku-master-state';

// action types
const actions = {
  NEW_GAME: 'NEW_GAME',
  SET_CELL: 'SET_CELL',
  RESET_GAME: 'RESET_GAME',
  TICK: 'TICK',
  LOAD_SAVED: 'LOAD_SAVED',
  SET_HINT: 'SET_HINT',
  CLEAR_HINT: 'CLEAR_HINT',
};

function checkViolations(board, size) {
  const boxRows = size === 6 ? 2 : 3;
  const boxCols = size === 6 ? 3 : 3;
  const errors = Array.from({ length: size }, () => Array(size).fill(false));

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const val = board[row][col];
      if (val === 0) continue;

      // check row duplicates
      for (let c = 0; c < size; c++) {
        if (c !== col && board[row][c] === val) {
          errors[row][col] = true;
          errors[row][c] = true;
        }
      }

      // check col duplicates
      for (let r = 0; r < size; r++) {
        if (r !== row && board[r][col] === val) {
          errors[row][col] = true;
          errors[r][col] = true;
        }
      }

      // check subgrid
      const startRow = Math.floor(row / boxRows) * boxRows;
      const startCol = Math.floor(col / boxCols) * boxCols;
      for (let r = startRow; r < startRow + boxRows; r++) {
        for (let c = startCol; c < startCol + boxCols; c++) {
          if (r !== row || c !== col) {
            if (board[r][c] === val) {
              errors[row][col] = true;
              errors[r][c] = true;
            }
          }
        }
      }
    }
  }

  return errors;
}

function checkComplete(board, errors, size) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return false;
      if (errors[r][c]) return false;
    }
  }
  return true;
}

const initialState = {
  board: [],
  initialBoard: [],
  solution: [],
  errors: [],
  timer: 0,
  isComplete: false,
  mode: null,
  selectedCell: null,
  hintCell: null, // { row, col } for highlighting
};

// load saved game from localStorage
function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // check if saved data looks valid
      if (parsed.board && parsed.initialBoard && parsed.mode) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore errors reading localStorage
  }
  return null;
}

// save to localStorage
function saveToStorage(state) {
  try {
    const toSave = {
      board: state.board,
      initialBoard: state.initialBoard,
      solution: state.solution,
      errors: state.errors,
      timer: state.timer,
      isComplete: state.isComplete,
      mode: state.mode,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    // ignore errors writing localStorage
  }
}

// clear saved game
function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case actions.LOAD_SAVED: {
      const saved = action.payload;
      return {
        ...state,
        ...saved,
        hintCell: null,
      };
    }
    case actions.NEW_GAME: {
      const { mode } = action.payload;
      const { solution, puzzle } = generateSudoku(mode);
      const size = mode === 'easy' ? 6 : 9;
      const errors = Array.from({ length: size }, () => Array(size).fill(false));
      clearStorage();
      return {
        ...state,
        board: puzzle.map(row => [...row]),
        initialBoard: puzzle.map(row => [...row]),
        solution,
        errors,
        timer: 0,
        isComplete: false,
        mode,
        selectedCell: null,
        hintCell: null,
      };
    }
    case actions.SET_CELL: {
      const { row, col, value } = action.payload;
      const size = state.mode === 'easy' ? 6 : 9;
      if (state.initialBoard[row][col] !== 0 || state.isComplete) return state;

      const newBoard = state.board.map(r => [...r]);
      newBoard[row][col] = value;
      const errors = checkViolations(newBoard, size);
      const isComplete = checkComplete(newBoard, errors, size);

      // clear localStorage if game is complete
      if (isComplete) {
        clearStorage();
      }

      return {
        ...state,
        board: newBoard,
        errors,
        isComplete,
        hintCell: null, // clear hint when user makes a move
      };
    }
    case actions.RESET_GAME: {
      const size = state.mode === 'easy' ? 6 : 9;
      const resetBoard = state.initialBoard.map(r => [...r]);
      const errors = Array.from({ length: size }, () => Array(size).fill(false));
      clearStorage();
      return {
        ...state,
        board: resetBoard,
        errors,
        timer: 0,
        isComplete: false,
        selectedCell: null,
        hintCell: null,
      };
    }
    case actions.TICK: {
      if (state.isComplete) return state;
      return { ...state, timer: state.timer + 1 };
    }
    case actions.SET_HINT: {
      return { ...state, hintCell: action.payload };
    }
    case actions.CLEAR_HINT: {
      return { ...state, hintCell: null };
    }
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, () => {
    // check localStorage on initial load
    const saved = loadFromStorage();
    if (saved) {
      return { ...initialState, ...saved, hintCell: null };
    }
    return initialState;
  });

  // save to localStorage when important stuff changes
  useEffect(() => {
    if (state.mode && !state.isComplete && state.board.length > 0) {
      saveToStorage(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.board, state.mode, state.timer, state.isComplete]);

  const startNewGame = (mode) => {
    dispatch({ type: actions.NEW_GAME, payload: { mode } });
  };

  const setCellValue = (row, col, value) => {
    dispatch({ type: actions.SET_CELL, payload: { row, col, value } });
  };

  const resetGame = () => {
    dispatch({ type: actions.RESET_GAME });
  };

  const tick = () => {
    dispatch({ type: actions.TICK });
  };

  const getHint = () => {
    if (state.isComplete || state.board.length === 0) return;
    const size = state.mode === 'easy' ? 6 : 9;
    const hint = findHint(state.board, state.initialBoard, size);
    if (hint) {
      dispatch({ type: actions.SET_HINT, payload: { row: hint.row, col: hint.col } });
      // auto fill the hint value
      dispatch({ type: actions.SET_CELL, payload: { row: hint.row, col: hint.col, value: hint.value } });
    }
  };

  return (
    <GameContext.Provider value={{
      ...state,
      startNewGame,
      setCellValue,
      resetGame,
      tick,
      getHint,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

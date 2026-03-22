# Sudoku Master - Project 2 by Xingchen Liu and Xinyi Hu

A single-player Sudoku game built with React for CS5610 Project 2. We took the static pages from Project 1 and turned them into a working React app with actual game logic.

## Links

- **GitHub Repo**: https://github.com/ivanlxc/Xingchen-Liu-Xinyi-Hu-project2.git
- **Render App**: https://xingchen-liu-xinyi-hu-project2.onrender.com/
- **Video Walkthrough**: https://youtu.be/bEQzROQmLh0


## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Welcome page with game title and links to play/rules |
| Game Selection | `/games` | List of games with authors (mock data) |
| Normal Game | `/games/normal` | 9x9 Sudoku with 28-30 pre-filled cells |
| Easy Game | `/games/easy` | 6x6 Sudoku with 18 pre-filled cells |
| Rules | `/rules` | Game rules and credits |
| High Scores | `/scores` | Leaderboard with mock data |
| Login | `/login` | Login form (no functionality) |
| Register | `/register` | Register form (no functionality) |

## Writeup

### Q1: What were some challenges you faced while making this app?


The hardest part was definitely the Sudoku generator. Getting backtracking to work for both 6x6 and 9x9 was tricky, especially the subgrid sizes (3x2 vs 3x3) which I kept messing up at first. Managing all the game state through Context API and useReducer was also confusing at times — like making sure error checking and win detection happened in the right order after each cell update. localStorage was annoying to integrate because I had to be careful about when to save and when to clear.

### Q2: Given more time, what additional features, functional or design changes would you make?

If I had more time I'd probably add a hard mode with fewer given cells, and make the login/register pages actually work with a real backend. It would be cool to have the high scores page save real data too instead of just mock data. I'd also want to add a pencil/notes mode where you can write possible numbers in a cell, and maybe some animations for when you complete the puzzle.

### Q3: What assumptions did you make while working on this assignment?


I assumed "normal" mode means the standard 9x9 grid since the rubric says easy (6x6) and normal (9x9). The Selection page and High Scores page just use hardcoded mock data since the requirements said so. For the timer I made it count up from zero since there's no time limit mentioned anywhere.

### Q4: How long did this assignment take to complete?

About 15-20 hours total, including the bonus features.

### Q5: What bonus points did you accomplish?

#### Local Storage (3 pts)
I used `localStorage` to save the game state so it survives page refreshes. All the localStorage code is in `src/context/GameContext.js`. When the app loads it checks if there's saved data and restores it. Every move gets saved, and when the game is done or reset it clears the storage.

Key code: `src/context/GameContext.js` - see `loadFromStorage()`, `saveToStorage()`, and `clearStorage()` functions (lines 83-109), and the `useEffect` hook that triggers saves (lines 222-228).

#### Backtracking - Unique Solution (4 pts)
The puzzle generator uses backtracking to make sure every puzzle has exactly one solution. It first generates a full valid board, then removes cells one at a time. After removing each cell, `countSolutions()` checks if the puzzle still has only one solution — if not, the cell gets put back.

Key code: `src/utils/sudokuGenerator.js` - see `countSolutions()` function (lines 62-95) and `createUniquePuzzle()` function (lines 98-121). The `countSolutions` function uses a `maxCount` parameter set to 2, so it stops as soon as it finds a second solution, making it efficient.

#### Hint System (5 pts)
There's a "Hint" button below the board. When you click it, the game looks for an empty cell where only one number could go (based on row/column/subgrid constraints). It highlights that cell yellow and fills in the value. If there's no cell with just one option, nothing happens.

Key code: `src/utils/sudokuGenerator.js` - see `findHint()` function (lines 124-172). The function iterates through all empty cells, calculates valid candidates for each, and returns one that has exactly one candidate. The hint UI is in `src/pages/GamePage.js` (line 95) and the highlight style is `.cell-hint` in `src/pages/GamePage.css`.

## Collaborators

- Xingchen Liu (Github: ivanlxc)
- Xinyi Hu (Github: 123321-xy)

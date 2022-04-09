import { TileIdentity, PlayState, ValidMove, ValidRotation } from './constants';
import {
  addShapeToGrid,
  getRandomShape,
  canMakeMove,
  moveActiveTetromino,
  freezeGrid,
  gameIsOver,
  checkForLineClear,
  clearLines,
  getEmptyGrid,
  attemptRotation,
  smashDown,
} from './functions';

interface GameState {
  score: number;
  grid: TileIdentity[][];
  playState: PlayState;
}

type GameAction =
  | 'START'
  | 'TICK'
  | 'PAUSE/RESUME'
  | 'RESET'
  | 'MOVE_DOWN'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT'
  | 'ROTATE_CLOCKWISE'
  | 'ROTATE_COUNTER'
  | 'SMASH';

const gameStateReducer = (
  prevState: GameState,
  action: GameAction
): GameState => {
  const {
    grid: prevGrid,
    score: prevScore,
    playState: prevPlayState,
  } = prevState;
  if (action === 'START') {
    return {
      score: 0,
      grid: addShapeToGrid(getRandomShape(Date.now()), prevGrid),
      playState: 'playing',
    };
  }
  if (action === 'TICK') {
    if (canMakeMove(prevGrid, 'down')) {
      return {
        score: prevScore,
        grid: moveActiveTetromino(prevGrid, 'down'),
        playState: prevPlayState,
      };
    }
    const frozenGrid = freezeGrid(prevGrid);
    if (gameIsOver(frozenGrid)) {
      return { score: prevScore, grid: frozenGrid, playState: 'over' };
    }
    const linesToClear = checkForLineClear(frozenGrid);
    const clearedGrid = clearLines(frozenGrid, linesToClear);
    return {
      score: prevScore + linesToClear.length,
      grid: addShapeToGrid(getRandomShape(Date.now()), clearedGrid),
      playState: prevPlayState,
    };
  }
  if (action === 'PAUSE/RESUME') {
    const newPlayState = prevPlayState === 'playing' ? 'paused' : 'playing';
    return { score: prevScore, grid: prevGrid, playState: newPlayState };
  }
  if (action === 'RESET') {
    return {
      score: 0,
      grid: getEmptyGrid(),
      playState: 'fresh',
    };
  }
  if (action.startsWith('MOVE')) {
    if (prevPlayState !== 'playing') return prevState;
    const direction = action.split('_')[1].toLocaleLowerCase() as ValidMove;
    const newGrid = canMakeMove(prevGrid, direction)
      ? moveActiveTetromino(prevGrid, direction)
      : prevGrid;
    return { score: prevScore, grid: newGrid, playState: prevPlayState };
  }
  if (action.startsWith('ROTATE')) {
    if (prevPlayState !== 'playing') return prevState;
    const direction = action.split('_')[1].toLocaleLowerCase() as ValidRotation;
    return {
      score: prevScore,
      grid: attemptRotation(prevGrid, direction),
      playState: prevPlayState,
    };
  }
  if (action === 'SMASH') {
    if (prevPlayState !== 'playing') return prevState;
    return {
      score: prevScore,
      grid: smashDown(prevGrid),
      playState: prevPlayState,
    };
  }
  return prevState;
};

export default gameStateReducer;

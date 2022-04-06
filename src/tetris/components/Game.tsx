import { useState, useEffect, useRef } from 'react';
import {
  addShapeToGrid,
  attemptRotation,
  canMakeMove,
  checkForLineClear,
  clearLines,
  freezeGrid,
  gameIsOver,
  getEmptyGrid,
  getRandomShape,
  moveActiveTetromino,
  smashDown,
} from './utils/gameFunctions';
import { GameState, ValidMove } from './utils';
import Grid from './Grid';
import { Link } from 'react-router-dom';

const TICK_TIME = 500;

const Tetris = () => {
  const score = useRef(0);
  const [gameState, setGameState] = useState<GameState>('fresh');
  const [grid, setGrid] = useState(getEmptyGrid());
  // handles tick
  useEffect(() => {
    let tickTimeout: NodeJS.Timeout;
    const tick = () => {
      tickTimeout = setTimeout(() => {
        setGrid((prevGrid) => {
          if (canMakeMove(prevGrid, 'down')) {
            return moveActiveTetromino(prevGrid, 'down');
          } else {
            const frozenGrid = freezeGrid(prevGrid);
            if (gameIsOver(frozenGrid)) {
              setGameState('over');
              return frozenGrid;
            }
            const linesToClear = checkForLineClear(frozenGrid);
            const clearedGrid = clearLines(frozenGrid, linesToClear);
            score.current += linesToClear.length;
            return addShapeToGrid(getRandomShape(Date.now()), clearedGrid);
          }
        });
        tick();
      }, TICK_TIME);
    };
    if (gameState === 'playing') tick();
    return () => {
      clearTimeout(tickTimeout);
    };
  }, [gameState]);

  // handles user input
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const keyName = event.key.toLocaleLowerCase();
      if (keyName.startsWith('arrow') && !keyName.endsWith('up')) {
        const moveDirection = keyName.split('arrow')[1] as ValidMove;
        setGrid((prevGrid) => {
          return canMakeMove(prevGrid, moveDirection)
            ? moveActiveTetromino(prevGrid, moveDirection)
            : prevGrid;
        });
      } else if (keyName === 'arrowup') {
        setGrid((prevGrid) => attemptRotation(prevGrid, 'clockwise'));
      } else if (keyName === 'shift') {
        setGrid((prevGrid) => attemptRotation(prevGrid, 'counter clockwise'));
      } else if (keyName === ' ') setGrid((prevGrid) => smashDown(prevGrid));
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const gameStartHandler = () => {
    setGrid((prevGrid) => addShapeToGrid(getRandomShape(Date.now()), prevGrid));
    setGameState('playing');
  };

  const gamePauseHandler = () => {
    setGameState((prevState) => {
      return prevState === 'playing' ? 'paused' : 'playing';
    });
  };

  const gameResetHandler = () => {
    setGrid(getEmptyGrid());
    setGameState('fresh');
  };

  return (
    <>
      <Link to="/">HOME</Link>
      Score: {score.current}
      <Grid grid={grid} />
      <button onClick={gameStartHandler} disabled={gameState !== 'fresh'}>
        START GAME
      </button>
      <button
        onClick={gamePauseHandler}
        disabled={gameState === 'fresh' || gameState === 'over'}
      >
        PAUSE/RESUME GAME
      </button>
      <button onClick={gameResetHandler} disabled={gameState === 'fresh'}>
        RESET GAME
      </button>
      {gameState === 'over' && 'Game Over'}
    </>
  );
};

export default Tetris;

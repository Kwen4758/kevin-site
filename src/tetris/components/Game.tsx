import { useState, useEffect, useRef, useCallback } from 'react';
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
} from './logic/functions';
import { GameState } from './logic/constants';
import Grid from './Grid';
import useKeyEvents from './logic/useKeyEvents';
import useSwipeEvents from './logic/useSwipeEvents';

const TICK_TIME = 500;

const Tetris = () => {
  const score = useRef(0);
  const [grid, setGrid] = useState(getEmptyGrid());
  const [gameState, setGameState] = useState<GameState>('fresh');

  const isPlaying = gameState === 'playing';

  // handles tick
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
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
      }, TICK_TIME);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying]);

  const moveDownHandler = useCallback(() => {
    if (isPlaying)
      setGrid((prevGrid) => {
        return canMakeMove(prevGrid, 'down')
          ? moveActiveTetromino(prevGrid, 'down')
          : prevGrid;
      });
  }, [isPlaying]);

  const moveRightHandler = useCallback(() => {
    if (isPlaying)
      setGrid((prevGrid) => {
        return canMakeMove(prevGrid, 'right')
          ? moveActiveTetromino(prevGrid, 'right')
          : prevGrid;
      });
  }, [isPlaying]);

  const moveLeftHandler = useCallback(() => {
    if (isPlaying)
      setGrid((prevGrid) => {
        return canMakeMove(prevGrid, 'left')
          ? moveActiveTetromino(prevGrid, 'left')
          : prevGrid;
      });
  }, [isPlaying]);

  const rotateClockwiseHandler = useCallback(() => {
    if (isPlaying) {
      setGrid((prevGrid) => attemptRotation(prevGrid, 'clockwise'));
    }
  }, [isPlaying]);

  const rotateCounterHandler = useCallback(() => {
    if (isPlaying) {
      setGrid((prevGrid) => attemptRotation(prevGrid, 'counter clockwise'));
    }
  }, [isPlaying]);

  const smashHandler = useCallback(() => {
    if (isPlaying) setGrid((prevGrid) => smashDown(prevGrid));
  }, [isPlaying]);

  useKeyEvents({
    arrowDown: moveDownHandler,
    arrowRight: moveRightHandler,
    arrowLeft: moveLeftHandler,
    arrowUp: rotateClockwiseHandler,
    shift: rotateCounterHandler,
    space: smashHandler,
  });

  useSwipeEvents({
    onSwipeUp: rotateClockwiseHandler,
    onSwipeDown: smashHandler,
    onSwipeLeft: moveRightHandler,
    onSwipeRight: moveLeftHandler,
  });

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
      Score: {score.current}
      <Grid grid={grid} />
      {gameState === 'over' ? (
        'Game Over'
      ) : (
        <>
          <button onClick={gameStartHandler} disabled={gameState !== 'fresh'}>
            START GAME
          </button>
          <button onClick={gamePauseHandler} disabled={gameState === 'fresh'}>
            PAUSE/RESUME GAME
          </button>
        </>
      )}
      {gameState !== 'fresh' && (
        <button onClick={gameResetHandler}>RESET GAME</button>
      )}
    </>
  );
};

export default Tetris;

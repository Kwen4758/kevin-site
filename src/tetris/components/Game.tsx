import { useEffect, useReducer, useRef } from 'react';
import { getEmptyGrid } from '../logic/functions';
import Grid from './Grid';
import useKeyEvents from '../logic/useKeyEvents';
import useSwipeEvents from '../logic/useSwipeEvents';
import gameStateReducer from '../logic/gameStateReducer';
import { Button } from '@mui/material';

const TICK_TIME = 500;

const Tetris = () => {
  const [state, dispatch] = useReducer(gameStateReducer, {
    score: 0,
    grid: getEmptyGrid(),
    playState: 'fresh',
  });

  const isPlaying = state.playState === 'playing';

  // handles tick
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        dispatch('TICK');
      }, TICK_TIME);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying]);

  const keyFunctions = useRef({
    arrowDown: () => dispatch('MOVE_DOWN'),
    arrowRight: () => dispatch('MOVE_RIGHT'),
    arrowLeft: () => dispatch('MOVE_LEFT'),
    arrowUp: () => dispatch('ROTATE_CLOCKWISE'),
    shift: () => dispatch('ROTATE_COUNTER'),
    space: () => dispatch('SMASH'),
  });

  const swipeFunctions = useRef({
    onSwipeUp: () => dispatch('ROTATE_CLOCKWISE'),
    onSwipeDown: () => dispatch('SMASH'),
    onSwipeLeft: () => dispatch('MOVE_LEFT'),
    onSwipeRight: () => dispatch('MOVE_RIGHT'),
  });

  useKeyEvents(keyFunctions.current);
  useSwipeEvents(swipeFunctions.current);

  return (
    <>
      Score: {state.score}
      <Grid grid={state.grid} />
      {state.playState === 'over' ? (
        'Game Over'
      ) : (
        <>
          <Button
            variant="contained"
            onClick={() => dispatch('START')}
            disabled={state.playState !== 'fresh'}
          >
            START GAME
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch('PAUSE/RESUME')}
            disabled={state.playState === 'fresh'}
          >
            PAUSE/RESUME GAME
          </Button>
        </>
      )}
      {state.playState !== 'fresh' && (
        <Button variant="contained" onClick={() => dispatch('RESET')}>
          RESET GAME
        </Button>
      )}
    </>
  );
};

export default Tetris;

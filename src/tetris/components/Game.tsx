import { useState, useEffect, useRef } from 'react';
import {
  addShapeToGrid,
  checkForLineClear,
  clearLines,
  freezeGrid,
  getEmptyGrid,
  getRandomShape,
  moveShape,
} from './utils/gameFunctions';
import Grid from './Grid';
import { ValidMove } from './utils';

const TICK_TIME = 500;

const Tetris = () => {
  const score = useRef(0);
  const [grid, setGrid] = useState(
    addShapeToGrid(getRandomShape(Date.now()), getEmptyGrid())
  );
  useEffect(() => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const keyName = event.key.toLocaleLowerCase();
      if (keyName.startsWith('arrow') && !keyName.endsWith('up')) {
        setGrid((prevGrid) => {
          const newGrid = moveShape(
            prevGrid,
            keyName.split('arrow')[1] as ValidMove
          );
          return newGrid || prevGrid;
        });
      }
    });
    const tick = () => {
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = moveShape(prevGrid, 'down');
          if (newGrid) return newGrid;
          else {
            const frozenGrid = freezeGrid(prevGrid);
            const linesToClear = checkForLineClear(frozenGrid);
            const clearedGrid = clearLines(frozenGrid, linesToClear);
            score.current += linesToClear.length;
            return addShapeToGrid(getRandomShape(Date.now()), clearedGrid);
          }
        });
        tick();
      }, TICK_TIME);
    };
    tick();
  }, []);
  return (
    <>
      <Grid grid={grid} />
      {score.current}
    </>
  );
};

export default Tetris;

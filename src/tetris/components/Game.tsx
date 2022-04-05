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
  const lastTick = useRef(Date.now());
  const score = useRef(0);
  const [grid, setGrid] = useState(
    addShapeToGrid(getRandomShape(lastTick.current), getEmptyGrid())
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentTime = Date.now();
      setGrid((prevGrid) => {
        const newGrid = moveShape(prevGrid, 'down');
        if (newGrid) return newGrid;
        else {
          const frozenGrid = freezeGrid(prevGrid);
          const linesToClear = checkForLineClear(frozenGrid);
          const clearedGrid = clearLines(frozenGrid, linesToClear);
          if (currentTime - lastTick.current > 500) {
            lastTick.current = currentTime;
            score.current += linesToClear.length;
          }
          return addShapeToGrid(getRandomShape(lastTick.current), clearedGrid);
        }
      });
    }, TICK_TIME);
    return () => clearTimeout(timer);
  });
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
  }, []);
  return (
    <>
      <Grid grid={grid} />
      {score.current}
    </>
  );
};

export default Tetris;

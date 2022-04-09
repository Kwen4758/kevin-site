import {
  emptyTile,
  Tetromino,
  TetrominoArrayMap as TAM,
  TileIdentity,
  ValidMove,
  ValidRotation,
} from './constants';

const deepClone = (grid: TileIdentity[][]) => {
  return grid.map((row) => {
    return row.map((tile) => {
      return { ...tile } as TileIdentity;
    });
  });
};

export const getEmptyGrid = () => {
  // extra 2 rows as buffer where new piece will be placed
  return new Array(22)
    .fill(0)
    .map(() => new Array<TileIdentity>(10).fill({ ...emptyTile }));
};

export const getRandomShape = (id: number) => {
  const shapeArray = Object.entries(TAM) as [Tetromino, number[][]][];
  const [tetromino, myArray] =
    shapeArray[Math.floor(Math.random() * shapeArray.length)];
  const myIdentity = { id, tetromino };
  return myArray.map((row) =>
    row.map((filled) =>
      filled === 0 ? { ...emptyTile } : { ...myIdentity, activeState: filled }
    )
  ) as TileIdentity[][];
};

export const addShapeToGrid = (
  shape: TileIdentity[][],
  grid: TileIdentity[][]
) => {
  const startX = Math.floor((grid[0].length - shape.length) / 2) - 1;
  const newGrid = deepClone(grid);
  shape.forEach((row, rowIndex) => {
    newGrid[rowIndex] = [
      ...grid[rowIndex].slice(0, startX),
      ...row,
      ...grid[rowIndex].slice(startX + row.length),
    ];
  });
  return newGrid;
};

// checks only for cardinal directions
export const canMakeMove = (grid: TileIdentity[][], direction: ValidMove) => {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const tile = row[columnIndex];
      if (tile.activeState === 2 || tile.activeState === 3) {
        switch (direction) {
          case 'left': {
            const destination = grid[rowIndex][columnIndex - 1];
            if (destination?.activeState !== 0 && destination?.id !== tile.id)
              return false;
            break;
          }
          case 'right': {
            const destination = grid[rowIndex][columnIndex + 1];
            if (destination?.activeState !== 0 && destination?.id !== tile.id)
              return false;
            break;
          }
          case 'down': {
            const destination = grid[rowIndex + 1]
              ? grid[rowIndex + 1][columnIndex]
              : undefined;
            if (destination?.activeState !== 0 && destination?.id !== tile.id)
              return false;
            break;
          }
        }
      }
    }
  }
  return true;
};

export const moveActiveTetromino = (
  originalGrid: TileIdentity[][],
  direction: ValidMove
) => {
  const newGrid = deepClone(originalGrid);
  const justSet: string[] = [];
  for (let rowIndex = 0; rowIndex < originalGrid.length; rowIndex++) {
    const row = originalGrid[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const tileToMove = row[columnIndex];
      if (tileToMove.activeState === 2 || tileToMove.activeState === 3) {
        switch (direction) {
          case 'left':
            newGrid[rowIndex][columnIndex - 1] = tileToMove;
            justSet.push(`${rowIndex}-${columnIndex - 1}`);
            break;
          case 'right':
            newGrid[rowIndex][columnIndex + 1] = tileToMove;
            justSet.push(`${rowIndex}-${columnIndex + 1}`);
            break;
          case 'down':
            newGrid[rowIndex + 1][columnIndex] = tileToMove;
            justSet.push(`${rowIndex + 1}-${columnIndex}`);
            break;
        }
        if (!justSet.includes(`${rowIndex}-${columnIndex}`))
          newGrid[rowIndex][columnIndex] = { ...emptyTile };
      }
    }
  }
  return newGrid;
};

export const attemptRotation = (
  originalGrid: TileIdentity[][],
  direction: ValidRotation
) => {
  const center = (() => {
    for (let rowIndex = 0; rowIndex < originalGrid.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < originalGrid[rowIndex].length;
        columnIndex++
      ) {
        if (originalGrid[rowIndex][columnIndex].activeState === 3) {
          return { x: columnIndex, y: rowIndex };
        }
      }
    }
  })();
  if (!center) {
    return originalGrid;
  }
  const newGrid = deepClone(originalGrid);
  const justSet: string[] = [];
  for (let rowIndex = 0; rowIndex < originalGrid.length; rowIndex++) {
    const row = originalGrid[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const tileToMove = row[columnIndex];
      if (tileToMove.activeState === 2) {
        switch (direction) {
          case 'clockwise': {
            const destinationY = center.y - center.x + columnIndex;
            const destinationX = center.x + center.y - rowIndex;
            if (
              !newGrid[destinationY] ||
              !newGrid[destinationY][destinationX] ||
              newGrid[destinationY][destinationX].activeState === 1
            ) {
              return originalGrid;
            }
            newGrid[destinationY][destinationX] = tileToMove;
            justSet.push(`${destinationY}-${destinationX}`);
            break;
          }
          case 'counter': {
            const destinationY = center.y + center.x - columnIndex;
            const destinationX = center.x - center.y + rowIndex;
            if (
              !newGrid[destinationY] ||
              !newGrid[destinationY][destinationX] ||
              newGrid[destinationY][destinationX].activeState === 1
            ) {
              return originalGrid;
            }
            newGrid[destinationY][destinationX] = tileToMove;
            justSet.push(`${destinationY}-${destinationX}`);
            break;
          }
        }
        if (!justSet.includes(`${rowIndex}-${columnIndex}`))
          newGrid[rowIndex][columnIndex] = { ...emptyTile };
      }
    }
  }
  return newGrid;
};

export const smashDown = (grid: TileIdentity[][]) => {
  let currentGrid = grid;
  while (canMakeMove(currentGrid, 'down')) {
    currentGrid = moveActiveTetromino(currentGrid, 'down');
  }
  return currentGrid;
};

export const freezeGrid = (grid: TileIdentity[][]) => {
  return grid.map((row) => {
    return row.map((tile) => {
      return {
        ...tile,
        activeState:
          tile.activeState === 2 || tile.activeState === 3
            ? 1
            : tile.activeState,
      } as TileIdentity;
    });
  });
};

export const checkForLineClear = (grid: TileIdentity[][]): number[] => {
  const fullRows: number[] = [];
  grid.forEach((row, rowIndex) => {
    if (!row.find((tile) => tile.activeState === 0)) fullRows.push(rowIndex);
  });
  return fullRows;
};

export const clearLines = (grid: TileIdentity[][], fullRows: number[]) => {
  const newGrid: TileIdentity[][] = [];
  grid.forEach((row, rowIndex) => {
    if (!fullRows.includes(rowIndex)) newGrid.push(row);
  });
  while (newGrid.length < grid.length)
    newGrid.unshift(new Array(grid[0].length).fill({ ...emptyTile }));
  return newGrid;
};

export const gameIsOver = (grid: TileIdentity[][]) => {
  return !!grid
    .slice(0, 3)
    .flat()
    .find((tile) => tile.activeState === 1);
};

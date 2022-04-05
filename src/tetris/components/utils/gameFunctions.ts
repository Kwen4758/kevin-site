import {
  emptyTile,
  Tetromino,
  TetrominoArrayMap as TAM,
  TileIdentity,
  ValidMove,
} from './index';

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
    shapeArray[6 || Math.floor(Math.random() * shapeArray.length)];
  const myIdentity = { id, tetromino };
  return myArray.map((row) =>
    row.map((filled) =>
      filled === 0
        ? { ...emptyTile }
        : { ...myIdentity, activeState: filled }
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
const canMakeMove = (grid: TileIdentity[][], direction: ValidMove) => {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const tile = row[columnIndex];
      if (tile.activeState === 2 || tile.activeState === 3) {
        switch (direction) {
          case 'left':
            const destinationLeft = grid[rowIndex][columnIndex - 1];
            if (
              destinationLeft?.activeState !== 0 &&
              destinationLeft?.id !== tile.id
            )
              return false;
            break;
          case 'right':
            const destinationRight = grid[rowIndex][columnIndex + 1];
            if (
              destinationRight?.activeState !== 0 &&
              destinationRight?.id !== tile.id
            )
              return false;
            break;
          case 'down':
            const destinationDown = grid[rowIndex + 1]
              ? grid[rowIndex + 1][columnIndex]
              : undefined;
            if (
              destinationDown?.activeState !== 0 &&
              destinationDown?.id !== tile.id
            )
              return false;
            break;
        }
      }
    }
  }
  return true;
};

export const moveShape = (
  originalGrid: TileIdentity[][],
  direction: ValidMove
) => {
  if (!canMakeMove(originalGrid, direction)) return false;
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
    newGrid.unshift(new Array(grid[0].length).fill(0).fill({ ...emptyTile }));
  return newGrid;
};

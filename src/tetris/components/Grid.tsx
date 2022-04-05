import styles from './utils/tetris.module.css';
import { Tetromino, TetrominoColorMap, TileIdentity } from './utils';

interface TileProps {
  tetromino: Tetromino | 'None';
}

const Tile = ({ tetromino }: TileProps) => {
  return (
    <div
      className={styles.tile}
      style={{ backgroundColor: TetrominoColorMap[tetromino] }}
    />
  );
};

interface GridRowProps {
  row: TileIdentity[];
}

const GridRow = ({ row }: GridRowProps) => {
  return (
    <div className={styles.flexRow}>
      {row.map((tileIdentity, columnIndex) => {
        return (
          <Tile
            tetromino={tileIdentity.tetromino ?? 'None'}
            key={columnIndex}
          />
        );
      })}
    </div>
  );
};

interface GridProps {
  grid: TileIdentity[][];
}

const Grid = ({ grid }: GridProps) => {
  return (
    <div className={styles.flexColumn}>
      {grid.slice(2).map((row, rowIndex) => (
        <GridRow key={rowIndex} row={row} />
      ))}
    </div>
  );
};

export default Grid;

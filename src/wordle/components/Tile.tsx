import styles from './wordle.module.css';

interface TileProps {
  text: string;
  color: string;
}

const Tile = ({ text, color }: TileProps) => {
  return (
    <div className={styles.tile} style={{ backgroundColor: color }}>
      {text}
    </div>
  );
};

export default Tile;

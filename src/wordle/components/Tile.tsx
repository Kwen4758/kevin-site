import styles from './wordle.module.css';

interface TileProps {
  text: string;
  color: string;
  textColor: string,
}

const Tile = ({ text, color, textColor }: TileProps) => {
  return (
    <div className={styles.tile} style={{ backgroundColor: color, color: textColor }}>
      {text}
    </div>
  );
};

export default Tile;

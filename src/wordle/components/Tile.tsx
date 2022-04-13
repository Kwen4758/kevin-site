import styles from './wordle.module.css';

interface TileProps {
  text: string;
  color: string;
  textColor: string;
  onClick?: (letter: string) => void;
  className?: string;
}

const Tile = ({ text, color, textColor, onClick, className }: TileProps) => {
  return (
    <div
      className={className ?? styles.tile}
      style={{ backgroundColor: color, color: textColor }}
      onClick={onClick && (() => onClick(text))}
    >
      {text}
    </div>
  );
};

export default Tile;

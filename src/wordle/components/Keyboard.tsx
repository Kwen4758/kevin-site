import Tile from './Tile';
import styles from './wordle.module.css';

interface KeyboardProps {
  onKeyPress: (keyName: string) => void;
  colorMap: { [letter: string]: string };
}

const letterRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['ENTER', 'BACKSPACE'],
];

const Keyboard = ({ onKeyPress, colorMap }: KeyboardProps) => {
  return (
    <div className={styles.keyboard}>
      {letterRows.map((row, index) => {
        return (
          <div className={styles.tileRow} key={index}>
            {row.map((letter) => {
              return (
                <Tile
                  text={letter}
                  textColor={colorMap[letter] ? 'white' : 'black'}
                  color={colorMap[letter] ?? 'white'}
                  onClick={(letter) => onKeyPress(letter)}
                  className={styles.keyboardKey}
                  key={letter}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;

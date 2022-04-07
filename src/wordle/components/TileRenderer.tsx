import styles from './wordle.module.css';
import Tile from './Tile';

interface TileRendererProps {
  maxTurns: number;
  correctAnswer: string;
  guesses: string[];
}

const getTileRow = (
  answer: string[],
  guess: string[],
  locked: boolean,
  row: number
) => {
  const getColor = (index: number) => {
    if (locked) {
      if (guess.length === 0) return 'grey';
      else if (guess[index] === answer[index]) return 'green';
      else if (answer.includes(guess[index])) return 'yellow';
      else return 'red';
    } else {
      return 'white';
    }
  };
  return (
    <div className={styles.tileRow} key={row}>
      {answer.map((char, i) => {
        const color = getColor(i);
        const letter = guess[i] ?? '';
        return <Tile text={letter} color={color} key={i} />;
      })}
    </div>
  );
};

const TileRenderer = ({
  maxTurns,
  correctAnswer,
  guesses,
}: TileRendererProps) => {
  const answerLetters = correctAnswer.split('');

  const guessesForRender = new Array(maxTurns).fill('').map((empty, i) => {
    if (i < guesses.length) return guesses[i];
    else return empty;
  });

  return (
    <div>
      {guessesForRender.map((guess, index) => {
        const guessLetters = guess.split('');
        const locked = index !== guesses.length - 1;
        return getTileRow(answerLetters, guessLetters, locked, index);
      })}
    </div>
  );
};

export default TileRenderer;

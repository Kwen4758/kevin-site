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
  const colorArray = new Array(answer.length).fill(locked ? 'grey' : 'white');
  const mutableAnswer = [...answer];

  if (guess.length > 0 && locked) {
    for (let pass = 0; pass < 3; pass++) {
      guess.forEach((letter, index) => {
        if (colorArray[index] !== 'grey') {
          // continue...
        } else if (pass === 0 && mutableAnswer[index] === letter) {
          mutableAnswer[index] = '_';
          colorArray[index] = 'green';
        } else if (pass === 1 && mutableAnswer.includes(letter)) {
          mutableAnswer[mutableAnswer.indexOf(letter)] = '_';
          colorArray[index] = 'yellow';
        } else if (pass === 2) {
          colorArray[index] = 'red';
        }
      });
    }
  }
  return (
    <div className={styles.tileRow} key={row}>
      {answer.map((char, i) => {
        const letter = guess[i] ?? '';
        return <Tile text={letter} color={colorArray[i]} key={i} />;
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

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
  const colorArray = new Array(answer.length).fill(locked ? 'black' : 'white');
  const mutableAnswer = [...answer];

  if (guess.length > 0 && locked) {
    for (let pass = 0; pass < 3; pass++) {
      guess.forEach((letter, index) => {
        if (colorArray[index] !== 'black') {
          // continue...
        } else if (pass === 0 && mutableAnswer[index] === letter) {
          mutableAnswer[index] = '_';
          colorArray[index] = '#538d4e';
        } else if (pass === 1 && mutableAnswer.includes(letter)) {
          mutableAnswer[mutableAnswer.indexOf(letter)] = '_';
          colorArray[index] = '#b59f3b';
        } else if (pass === 2) {
          colorArray[index] = '#3a3a3c';
        }
      });
    }
  }
  return (
    <div className={styles.tileRow} key={row}>
      {answer.map((char, i) => {
        const letter = guess[i] ?? '';
        return (
          <Tile
            text={letter}
            color={colorArray[i]}
            textColor={locked ? 'white' : 'black'}
            key={i}
          />
        );
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

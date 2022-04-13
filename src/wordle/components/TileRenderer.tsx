import styles from './wordle.module.css';
import Tile from './Tile';
import Keyboard from './Keyboard';

interface TileRendererProps {
  maxTurns: number;
  correctAnswer: string;
  guesses: string[];
  onKeyPress: (letter: string) => void;
}

const getTileRow = (
  answer: string[],
  guess: string[],
  locked: boolean,
  row: number,
  colorArray: string[]
) => {
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
  onKeyPress,
}: TileRendererProps) => {
  const answerLetters = correctAnswer.split('');

  const guessesForRender = new Array<string>(maxTurns)
    .fill('')
    .map((empty, i) => {
      if (i < guesses.length) return guesses[i];
      else return empty;
    });

  const keyBoardColorMap: { [letter: string]: string } = {};

  return (
    <>
      <div>
        {guessesForRender.map((guess, index) => {
          const guessLetters = guess.split('');
          const locked = index !== guesses.length - 1;
          const mutableAnswer = correctAnswer.split('');
          const colorArray = new Array<string>(mutableAnswer.length).fill(
            locked ? 'black' : 'white'
          );

          if (guessLetters.length > 0 && locked) {
            for (let pass = 0; pass < 3; pass++) {
              guessLetters.forEach((letter, index) => {
                if (colorArray[index] !== 'black') {
                  // continue...
                } else if (pass === 0 && mutableAnswer[index] === letter) {
                  mutableAnswer[index] = '_';
                  colorArray[index] = '#538d4e';
                  keyBoardColorMap[letter] = '#538d4e';
                } else if (pass === 1 && mutableAnswer.includes(letter)) {
                  mutableAnswer[mutableAnswer.indexOf(letter)] = '_';
                  colorArray[index] = '#b59f3b';
                  if (keyBoardColorMap[letter] !== '#538d4e') {
                    keyBoardColorMap[letter] = '#b59f3b';
                  }
                } else if (pass === 2) {
                  colorArray[index] = '#3a3a3c';
                  if (!keyBoardColorMap[letter])
                    keyBoardColorMap[letter] = '#3a3a3c';
                }
              });
            }
          }
          return getTileRow(
            answerLetters,
            guessLetters,
            locked,
            index,
            colorArray
          );
        })}
      </div>
      <Keyboard onKeyPress={onKeyPress} colorMap={keyBoardColorMap} />
    </>
  );
};

export default TileRenderer;

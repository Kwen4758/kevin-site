import { useState, useEffect, useCallback } from 'react';
import TileRenderer from './TileRenderer';
import { checkWord_API } from '../logic/functions';
import styles from './wordle.module.css';
import { Alert } from '@mui/material';

interface GameBoardProps {
  maxTurns: number;
  answer: string;
}

const GameBoard = ({ answer, maxTurns }: GameBoardProps) => {
  const [pastGuesses, setPastGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [alert, setAlert] = useState<JSX.Element | null>(null);

  const checkGuess = useCallback((word: string) => {
    checkWord_API(word).then((isWord) => {
      if (isWord) {
        setPastGuesses((prev) => [...prev, word]);
        setCurrentGuess('');
        setAlert(null);
      } else {
        setAlert(
          <Alert
            key={Math.random()}
            severity="warning"
            style={{ position: 'absolute', top: '3px' }}
            onClose={() => setAlert(null)}
          >
            Not a valid word.
          </Alert>
        );
      }
    });
  }, []);

  useEffect(() => {
    setPastGuesses([]);
    setCurrentGuess('');
  }, [answer]);

  const letterInputHandler = useCallback(
    (keyName: string) => {
      if (keyName === 'ENTER' && currentGuess.length === answer.length) {
        checkGuess(currentGuess);
      } else if (keyName === 'BACKSPACE') {
        setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
      } else if (
        keyName.length > 1 ||
        !keyName.match(/[A-Z]/) ||
        currentGuess.length === answer.length
      ) {
      } else return setCurrentGuess((prevGuess) => prevGuess + keyName);
    },
    [checkGuess, answer, currentGuess]
  );

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      const keyName = event.key.toLocaleUpperCase();
      letterInputHandler(keyName);
    };
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [letterInputHandler]);

  const gameOver =
    pastGuesses.includes(answer) || pastGuesses.length === maxTurns;
  const gameOverText = pastGuesses.includes(answer)
    ? `You Won in ${pastGuesses.length} Turns!!`
    : `You Lost!! The word was ${answer}.`;

  return (
    <div className={styles.flexColumn}>
      {gameOver && gameOverText}
      {alert}
      <TileRenderer
        maxTurns={maxTurns}
        correctAnswer={answer}
        guesses={[...pastGuesses, currentGuess]}
        onKeyPress={letterInputHandler}
      />
    </div>
  );
};

export default GameBoard;

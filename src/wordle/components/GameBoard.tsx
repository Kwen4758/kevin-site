import { useState, useEffect, useCallback } from 'react';
import TileRenderer from './TileRenderer';
import { checkWord } from './logic/functions';

interface GameBoardProps {
  maxTurns: number;
  answer: string;
}

const GameBoard = ({ answer, maxTurns }: GameBoardProps) => {
  const [pastGuesses, setPastGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  //console.log(currentGuess, pastGuesses);

  const whatever = useCallback((word: string) => {
    console.log('whatever');
    checkWord(word).then((isWord) => {
      console.log('checking word');
      if (isWord) {
        console.log('isword');
        setPastGuesses((prev) => [...prev, word]);
        setCurrentGuess('');
      } else console.log('not word')
    });
    console.log('end whatever')
  }, []);

  useEffect(() => {
    setPastGuesses([]);
    setCurrentGuess('');
  }, [answer]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const keyName = event.key.toLocaleUpperCase();
      setCurrentGuess((prevGuess) => {
        console.log({ prevGuess, answer, keyName });
        if (keyName === 'ENTER' && prevGuess.length === answer.length) {
          console.log('ender');
          whatever(prevGuess);
          return prevGuess;
        } else if (keyName === 'BACKSPACE') {
          return prevGuess.slice(0, -1);
        } else if (
          keyName.length > 1 ||
          !keyName.match(/[A-Z]/) ||
          prevGuess.length === answer.length
        ) {
          return prevGuess;
        } else return prevGuess + keyName;
      });
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [whatever, answer]);

  const gameOver =
    pastGuesses.includes(answer) || pastGuesses.length === maxTurns;
  const gameOverText = pastGuesses.includes(answer)
    ? `You Won in ${pastGuesses.length} Turns!!`
    : `You Lost!! The word was ${answer}.`;

  return (
    <div>
      {gameOver && gameOverText}
      <TileRenderer
        maxTurns={maxTurns}
        correctAnswer={answer}
        guesses={[...pastGuesses, currentGuess]}
      />
    </div>
  );
};

export default GameBoard;
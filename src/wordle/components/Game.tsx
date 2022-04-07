import { useEffect, useState } from 'react';
import GameBoard from './GameBoard';
import { getRandomWord } from './logic/functions';

const WordleGame = () => {
  const [answer, setAnswer] = useState('');

  const awaitNewWord = () => {
    getRandomWord(5).then((word) => setAnswer(word));
  };

  useEffect(() => {
    awaitNewWord();
  }, []);

  return (
    <>
      <GameBoard answer={answer} maxTurns={6} />
      <button title={'Try Again'} onClick={awaitNewWord}>
        Try Again
      </button>
    </>
  );
};

export default WordleGame;

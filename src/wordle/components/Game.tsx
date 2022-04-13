import { useState } from 'react';
import GameBoard from './GameBoard';
import { getRandomWord } from '../logic/functions';
import { Button } from 'antd';

const WordleGame = () => {
  const [answer, setAnswer] = useState(getRandomWord());

  // const awaitNewWord = () => {
  //   getRandomWord(5).then((word) => setAnswer(word));
  // };

  // useEffect(() => {
  //   awaitNewWord();
  // }, []);

  return (
    <>
      <GameBoard answer={answer} maxTurns={6} />
      <Button title={'Try Again'} onClick={() => setAnswer(getRandomWord())}>
        Try Again
      </Button>
    </>
  );
};

export default WordleGame;

import axios, { Method } from 'axios';
import WORDS_JSON from './words.json';

const words = WORDS_JSON as string[];

const getRandomWord_API = async (length: number): Promise<string> => {
  const options = {
    method: 'GET' as Method,
    url: 'https://wordsapiv1.p.rapidapi.com/words/',
    params: {
      letters: `${length}`,
      random: 'true',
      frequencyMin: '2',
      frequencyMax: '4',
      letterPattern: '[^\\s-]',
    },
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '754705c5efmsh89f0fcfb014aa06p1019a8jsna7391ce3eac6',
    },
  };

  const res = await axios.request(options).catch(function (error) {
    console.error(error);
  });

  return ((res?.data?.word as string) ?? 'rando').toLocaleUpperCase();
};

const checkWord_API = async (word: string): Promise<boolean> => {
  const options = {
    method: 'GET' as Method,
    url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '754705c5efmsh89f0fcfb014aa06p1019a8jsna7391ce3eac6',
    },
  };

  const res = await axios.request(options).catch((err) => null);
  const foundInApi = res?.status === 200;
  const isWord = foundInApi || words.includes(word.toLocaleLowerCase());

  return isWord;
};

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)].toLocaleUpperCase();
};

export { getRandomWord_API, checkWord_API, getRandomWord };

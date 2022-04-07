import axios, { Method } from 'axios';

const getRandomWord = async (length: number): Promise<string> => {
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

  const res: any = await axios.request(options).catch(function (error) {
    console.warn(error);
  });

  return ((res?.data?.word as string) ?? 'rando').toLocaleUpperCase();
};

const checkWord = async (word: string): Promise<boolean> => {
  const options = {
    method: 'GET' as Method,
    url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': '754705c5efmsh89f0fcfb014aa06p1019a8jsna7391ce3eac6',
    },
  };

  const res: any = await axios.request(options).catch(function (error) {
    console.warn('Not a word');
  });

  return res?.status === 200;
};

export { getRandomWord, checkWord };

import { Search } from './constants';

const apiKey = 'AIzaSyBOFB5DJcbOIfZ5jhwpgxKyBWWCOxiwrGg';
const searchEngineId = '23477d4e9e4825647';

export const performSearch = async (query: string, pageNumber = 0) => {
  const params = {
    q: query,
    cx: searchEngineId,
    key: apiKey,
    num: '10',
    start: (pageNumber * 10 + 1).toString(),
  };
  const options: RequestInit = {
    method: 'GET',
  };
  const response = await fetch(
    'https://www.googleapis.com/customsearch/v1?' + new URLSearchParams(params),
    options
  );

  const responseJson: Search = await response.json();

  console.log(responseJson);
  
  return responseJson.items
};

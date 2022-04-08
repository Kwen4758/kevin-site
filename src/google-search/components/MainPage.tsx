import { useState } from 'react';
import { Item } from '../logic/constants';
import { performSearch } from '../logic/functions';
import Result from './Result';
import SearchBar from './SearchBar';
import styles from './search.module.css';

const MainPage = () => {
  const [currentResults, setCurrentResults] = useState<Item[]>([]);

  return (
    <>
      <div className={styles.flexColumn}>
        <SearchBar
          onSubmit={(query) =>
            performSearch(query).then((results) => setCurrentResults(results))
          }
        />
        {currentResults.map((result, index) => (
          <Result key={index} item={result} />
        ))}
      </div>
    </>
  );
};

export default MainPage;

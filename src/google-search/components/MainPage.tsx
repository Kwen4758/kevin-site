import { useEffect, useState } from 'react';
import { Item } from '../logic/constants';
import { performSearch } from '../logic/functions';
import Result from './Result';
import SearchBar from './SearchBar';
import styles from './search.module.css';
import { Pagination } from '@mui/material';

const MainPage = () => {
  const [currentResults, setCurrentResults] = useState<Item[] | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setCurrentResults(null);
      return;
    }
    performSearch(query, pageNumber).then((results) =>
      setCurrentResults(results)
    );
  }, [pageNumber, query]);

  return (
    <>
      <div className={styles.flexColumn}>
        <SearchBar onSubmit={(query) => setQuery(query)} />
        {currentResults && (
          <>
            {currentResults.map((result, index) => (
              <Result key={index} item={result} />
            ))}
            <Pagination
              count={10}
              variant="outlined"
              page={pageNumber}
              onChange={(event, newPage) => setPageNumber(newPage)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;

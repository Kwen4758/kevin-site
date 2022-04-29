import React, { useEffect, useState } from 'react';
import { Song, performSearch } from '../logic';
import Result from './Result';
import SearchBar from '../../google-search/components/SearchBar';
import styles from './search.module.css';
import { Divider, List, Pagination } from '@mui/material';

const MainPage = () => {
  const [currentResults, setCurrentResults] = useState<Song[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setCurrentResults([]);
      return;
    }
    const songs = performSearch(query);
    setCurrentResults(songs);
    setPageNumber(1);
  }, [query]);

  const startIndex = (pageNumber - 1) * 10;

  return (
    <>
      <div className={styles.flexColumn}>
        <SearchBar onSubmit={(query) => setQuery(query)} />
        {currentResults.length > 0 && (
          <>
            <List sx={{ width: '100%', maxWidth: '50vw' }}>
              {currentResults
                .slice(startIndex, startIndex + 10)
                .map((result, index) => (
                  <React.Fragment key={`${result.title}-${result.artist}`}>
                    {index !== 0 && <Divider variant="inset" component="li" />}
                    <Result item={result} />
                  </React.Fragment>
                ))}
            </List>
            <Pagination
              count={Math.ceil(currentResults.length / 10)}
              variant="outlined"
              page={pageNumber}
              onChange={(event, newPage) => setPageNumber(newPage)}
              size={'large'}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;

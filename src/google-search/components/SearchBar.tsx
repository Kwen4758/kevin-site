import { Button } from 'antd';
import { useRef } from 'react';
import styles from './search.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  onChange?: (query: string) => void;
  value?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const mySubmit = () => {
    props.onSubmit(inputRef.current?.value ?? '');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      mySubmit();
    }
  };

  return (
    <div className={styles.flexRow}>
      <input
        className={styles.searchBar}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={mySubmit}>
        Submit
      </Button>
    </div>
  );
};

export default SearchBar;

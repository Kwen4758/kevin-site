import { Link } from 'react-router-dom';
import styles from '../app/app.module.css';
import MainPage from './components/MainPage';

const SearchEngine = () => {
  return <div className={styles.app}>
    <Link to="/" className={styles.appLink}>
        HOME
      </Link>
    <MainPage />
  </div>;
};

export default SearchEngine;

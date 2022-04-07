import { Link } from 'react-router-dom';
import styles from '../app/app.module.css';
import WordleGame from './components/Game';

const Wordle = () => {
  return (
    <div className={styles.app}>
      <Link to="/" className={styles.appLink}>
        HOME
      </Link>
      <WordleGame />
    </div>
  );
};

export default Wordle;

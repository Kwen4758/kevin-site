import styles from './app.module.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className={styles.app}>
      <Link to="/tetris" className={styles.appLink}>
        Tetris
      </Link>
      <Link to="/wordle" className={styles.appLink}>
        Wordle
      </Link>
      <Link to="/search-engine" className={styles.appLink}>
        Search Engine
      </Link>
    </div>
  );
}

export default App;

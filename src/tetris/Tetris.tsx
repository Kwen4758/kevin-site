import { Link } from 'react-router-dom';
import styles from '../app/app.module.css';
import TetrisGame from './components/Game';

const Tetris = () => {
  return (
    <div className={styles.app}>
      <Link to="/" className={styles.appLink}>
        HOME
      </Link>
      <TetrisGame />
    </div>
  );
};

export default Tetris;

import { Link } from 'react-router-dom';
import styles from '../app/app.module.css';
import TetrisGame from './components/Game';

const Tetris = () => {
  return (
    <div className={styles.app} style={{height:'100vh', width:'100vw'}}>
      <Link to="/" className={styles.appLink}>
        HOME
      </Link>
      <TetrisGame />
    </div>
  );
};

export default Tetris;

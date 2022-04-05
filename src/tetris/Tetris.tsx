import styles from '../app/app.module.css';
import TetrisGame from './components/Game';

const Tetris = () => {
  return (
    <div className={styles.app}>
      <TetrisGame />
    </div>
  );
};

export default Tetris;

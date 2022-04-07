import styles from '../app/app.module.css';
import WordleGame from './components/Game';

const Wordle = () => {
  return (
    <div className={styles.app}>
      <WordleGame />
    </div>
  );
};

export default Wordle;

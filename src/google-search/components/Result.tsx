import { Item } from '../logic/constants';
import styles from './search.module.css';

interface ResultProps {
  item: Item;
}

const Result = (props: ResultProps) => {
  const { item } = props;
  return (
    <div className={styles.resultContainer}>
      <div className={styles.flexColum}>
        <a href={item.link} className={styles.resultTitle}>
          {item.title}
        </a>
        <div className={styles.flexRow}>
          <p className={styles.resultSnippet}>{item.snippet}</p>
          {item.pagemap.cse_image && (
            <img src={item.pagemap.cse_image[0].src} alt={item.title}  className={styles.resultThumbnail}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;

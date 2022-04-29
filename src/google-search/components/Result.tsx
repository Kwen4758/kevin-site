import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Item } from '../logic/constants';
import styles from './search.module.css';

interface ResultProps {
  item: Item;
}

export const Result = ({ item }: ResultProps) => (
  <ListItem alignItems="flex-start">
    <a href={item.link} className={styles.result}>
      <ListItemAvatar>
        <Avatar
          alt={item.title}
          src={item.pagemap.cse_image ? item.pagemap.cse_image[0].src : ''}
        />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography color={'lightblue'} variant={'h6'}>{item.title}</Typography>}
        secondary={<Typography color={'white'}  variant={'subtitle2'}>{item.snippet}</Typography>}
      />
    </a>
  </ListItem>
);

export default Result;

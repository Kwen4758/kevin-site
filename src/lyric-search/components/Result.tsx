import { ListItem, ListItemText, Typography } from '@mui/material';
import { Song } from '../logic';

interface ResultProps {
  item: Song;
}

export const Result = ({ item }: ResultProps) => (
  <ListItem alignItems="flex-start">
    <ListItemText
      primary={
        <>
          <Typography color={'lightblue'} variant={'h5'}>
            {item.title}
          </Typography>
          <Typography color={'lightblue'} variant={'h6'}>
            {`${item.artist} (${item.year})`}
          </Typography>
        </>
      }
      secondary={
        <Typography color={'white'} variant={'subtitle2'}>
          {item.lyrics}
        </Typography>
      }
    />
  </ListItem>
);

export default Result;

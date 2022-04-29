import songsJSON from './lyrics.json';

export interface Song {
  rank: number;
  title: string;
  artist: string;
  year: number;
  lyrics: string;
  source: number;
}

export const performSearch = (query: string) => {
  const result: Song[] = [];
  const songs = songsJSON as Song[];
  songs.forEach((song) => {
    if (
      song.title.toLocaleString().includes(query) ||
      song.artist.toLocaleString().includes(query) ||
      song.lyrics.toLocaleString().includes(query) ||
      song.year === +query
    )
      result.push(song);
  });
  return result;
};

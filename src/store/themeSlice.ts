import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}

const initialThemeState: ThemeState = {theme: 'light'}

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggle: (state) => {
      const prevTheme = state.theme;
      state.theme = prevTheme === 'light' ? 'dark' : 'light';
    }
  }
});

export default themeSlice;
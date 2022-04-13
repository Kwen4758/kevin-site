import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';

const rootReducer = combineReducers({
  theme: themeSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export interface ReducerAction<P> {
  type: string;
  payload: P;
}

export type RootState = ReturnType<typeof rootReducer>;

export const themeActions = themeSlice.actions;

export default store;

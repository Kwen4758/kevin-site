import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tetris from './tetris/Tetris';
import Wordle from './wordle/Wordle';
import SearchEngine from './google-search/SearchEngine';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="tetris" element={<Tetris />} />
          <Route path="wordle" element={<Wordle />} />
          <Route path="search-engine" element={<SearchEngine />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './features/board/boardSlice';
import userReducer from './features/user/userSlice';

const preloadedState = loadState();

//save to localStorage middleware-only for user feature actions
const saveUserMiddleware = store => next => action => {
  next(action)
  if ((action.type).indexOf('user/login/google/fulfilled') === 0 || (action.type).indexOf('users/logout') === 0) {
    saveState({
      user: store.getState().user
    })
    console.log('saved user to localStorage');
  }
}

const store = configureStore({
  reducer: {
    board: boardReducer,
    user: userReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveUserMiddleware),
});



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

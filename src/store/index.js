import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import loginFormSlice from '../reducers/loginFormSlice';
import newsSlice from '../reducers/newsSlice';
import { loadState, saveState } from '../utility/localStorage';

const preloadedState = {
  auth: {
    token: loadState('token'),
    profile: loadState('profile'),
  }
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    loginForm: loginFormSlice,
    news: newsSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState('token', state.auth.token);
  saveState('profile', state.auth.profile);
});

export default store;
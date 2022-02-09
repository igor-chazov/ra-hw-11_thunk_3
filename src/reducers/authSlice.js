import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import links from '../utility/Links';

const authURL = links.auth;
const profileURL = links.profile;

export const userLogin = createAsyncThunk(
  'userLogin',
  async ({ login, password }) => {
    const response = await fetch(authURL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });

    let authResult = await response.json();

    if (!response.ok || !authResult || !authResult.token) {
      const errorMessage = (authResult && authResult.message)
        ? authResult.message
        : 'Ошибка аутентификации';

      throw new Error(errorMessage);
    }

    return authResult.token;
  },
);

export const authRequest = createAsyncThunk(
  'authRequest',
  async ({ url, opts = {} }, { getState }) => {
    const state = getState();
    if (!state.auth || !state.auth.token) {
      throw new Error('Данный профиль не существует');
    }

    const defaultOpts = {
      headers: { Authorization: `Bearer ${state.auth.token}` },
    };

    const response = await fetch(url, {
      ...defaultOpts,
      ...opts,
    });

    if (response.status === 401) {
      throw new Error('Ошибка авторизации');
    }

    const data = await response.json();
    if (!response.ok) {
      const errorMessage = (data && data.message)
        ? data.message
        : 'Запрос не выполнен';

      throw new Error(errorMessage);
    }

    return { data };
  },
);

export const readProfile = createAsyncThunk(
  'readProfile',
  async (url = profileURL, { dispatch }) => {
    const result = await dispatch(authRequest({ url }));

    if (!result.payload || !result.payload.data) {
      throw new Error((result.error) ? result.error.message : 'Неизвестная ошибка');
    }

    return result.payload.data;
  },
);

const initialState = {
  token: null,
  profile: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut() {
      return { ...initialState };
    }
  },
  extraReducers: {
    [userLogin.pending]: () => {
      return { ...initialState };
    },
    [userLogin.fulfilled]: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    [userLogin.rejected]: (state, action) => {
      return {
        ...state,
        token: null,
        profile: null,
        error: (action.error) ? action.error.message : 'Ошибка',
      };
    },

    [readProfile.fulfilled]: (state, action) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;

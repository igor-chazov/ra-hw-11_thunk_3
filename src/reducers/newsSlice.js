import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authRequest } from './authSlice';
import links from '../utility/Links';

const newsUrl = links.news;

export const readNews = createAsyncThunk(
  'readNews',
  async (_, { dispatch }) => {
    const result = await dispatch(authRequest({ url: newsUrl }));
    if (!result.payload || !result.payload.data) {
      throw new Error((result.error) ? result.error.message : 'Неизвестная ошибка');
    }

    return result.payload.data;
  },
);


const initialState = {
  items: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: {
    [readNews.pedning]: () => {
      return { ...initialState };
    },
    [readNews.fulfilled]: (state, action) => {
      return {
        ...state,
        items: [...action.payload],
      };
    },
  },
});

export default newsSlice.reducer;

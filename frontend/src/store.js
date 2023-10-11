import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "./slices/apiSlice.js";
import authSliceReducer from './slices/authSlice.js';
import postsListSliceReducer from './slices/postsListSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    posts: postsListSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store;
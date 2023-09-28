import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({
  reducers: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store;
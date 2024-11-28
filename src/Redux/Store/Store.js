// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { authQuery } from "../Query/Auth.query";

export const store = configureStore({
  reducer: {
    [authQuery.reducerPath]: authQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authQuery.middleware),
});
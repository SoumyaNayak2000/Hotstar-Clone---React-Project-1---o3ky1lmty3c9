import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: false
  }),
  reducer: {
    home: homeSlice,
    user: userSlice,
  },
});
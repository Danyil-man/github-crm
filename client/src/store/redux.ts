import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { repositoryReducer } from "./repository/repositorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    repository: repositoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

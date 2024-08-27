import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse } from "../../types/IAuth";
import { RootState } from "../redux";

export interface AuthState {
  user: IAuthResponse | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    login: (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;

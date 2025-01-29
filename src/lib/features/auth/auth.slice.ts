import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

import { AuthToken } from "@/types/auth/auth.model";
import { UserI } from "@/types/user/user.model";

export type AuthState = {
  isLogged: boolean;
  dataAuth: AuthToken;
  dataUser: UserI;
};

const authInitialState: AuthState = {
  isLogged: false,
  dataAuth: { accessToken: "" },
  dataUser: {} as UserI,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    saveAuth: (state, payload: PayloadAction<AuthToken>) => {
      state.dataAuth = payload.payload;
    },
    clearAuth: (state) => {
      state.dataAuth = { accessToken: "" };
      state.dataUser = {} as UserI;
      state.isLogged = false;
    },
    setIsLogged: (state, payload: PayloadAction<boolean>) => {
      state.isLogged = payload.payload;
    },
    saveUserData: (state, payload: PayloadAction<UserI>) => {
      state.dataUser = payload.payload;
    },
    updateUserData: (state, payload: PayloadAction<UserI>) => {
      state.dataUser = payload.payload;
    },
  },
});

export const { saveAuth, clearAuth, setIsLogged, saveUserData } =
  authSlice.actions;

// selectors
const authSelector = (state: RootState) => state.auth;

export const selectDataAuth = createSelector(
  authSelector,
  (state) => state.dataAuth,
);

// reducer
export default authSlice.reducer;

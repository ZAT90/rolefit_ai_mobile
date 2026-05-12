import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {AuthUser} from '../types/auth.types';

export type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  needsProfileSetup: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  needsProfileSetup: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        token: string;
        needsProfileSetup?: boolean;
      }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.needsProfileSetup = action.payload.needsProfileSetup ?? false;
    },
    markProfileComplete: state => {
      state.needsProfileSetup = false;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.needsProfileSetup = false;
    },
  },
});

export const {setCredentials, markProfileComplete, logout} = authSlice.actions;
export default authSlice.reducer;

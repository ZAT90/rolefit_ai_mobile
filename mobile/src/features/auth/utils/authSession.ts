import {apiSlice} from '../../../store/apiSlice';
import type {AppDispatch} from '../../../store/store';
import {clearAuthToken, saveAuthToken} from '../../../shared/lib/secureTokenStorage';
import {logout} from '../store/authSlice';

export const saveToken = (token: string) => {
  return saveAuthToken(token);
};

export const logoutAuth = async (dispatch: AppDispatch) => {
  await clearAuthToken();
  dispatch(logout());
  dispatch(apiSlice.util.resetApiState());
};

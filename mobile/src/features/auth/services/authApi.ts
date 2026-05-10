import {apiSlice} from '../../../store/apiSlice';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../types/auth.types';

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    getMe: builder.query<{user: AuthResponse['user']}, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
});

export const {useRegisterMutation, useLoginMutation, useGetMeQuery} = authApi;

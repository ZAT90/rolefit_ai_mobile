import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from './store';

const API_BASE_URL = 'http://localhost:4000/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Auth', 'Profile', 'Analysis'],
  endpoints: () => ({}),
});

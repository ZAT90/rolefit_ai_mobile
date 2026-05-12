import {apiSlice} from '../../../store/apiSlice';
import type {ProfilePayload, ProfileResponse} from '../types/profile.types';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createProfile: builder.mutation<ProfileResponse, ProfilePayload>({
      query: body => ({
        url: '/profile',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    getMyProfile: builder.query<ProfileResponse, void>({
      query: () => '/profile/me',
      providesTags: ['Profile'],
    }),
    updateMyProfile: builder.mutation<ProfileResponse, ProfilePayload>({
      query: body => ({
        url: '/profile/me',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = profileApi;

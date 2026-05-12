import {apiSlice} from '../../../store/apiSlice';
import type {AnalysesResponse} from '../types/analysis.types';

export const analysesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAnalyses: builder.query<AnalysesResponse, void>({
      query: () => '/analyses',
      providesTags: ['Analysis'],
    }),
  }),
});

export const {useGetAnalysesQuery} = analysesApi;

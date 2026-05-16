import { apiSlice } from '../../../store/apiSlice';
import type {
  AnalysesResponse,
  AnalysisResponse,
  CreateAnalysisPayload,
} from '../types/analysis.types';

export const analysesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createAnalysis: builder.mutation<AnalysisResponse, CreateAnalysisPayload>({
      query: body => ({
        url: '/analyses',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Analysis'],
    }),
    getAnalyses: builder.query<AnalysesResponse, void>({
      query: () => '/analyses',
      providesTags: ['Analysis'],
    }),
    getAnalysisById: builder.query<AnalysisResponse, string>({
      query: analysisId => `/analyses/${analysisId}`,
      providesTags: ['Analysis'],
    }),
  }),
});

export const {
  useCreateAnalysisMutation,
  useGetAnalysesQuery,
  useGetAnalysisByIdQuery,
} = analysesApi;

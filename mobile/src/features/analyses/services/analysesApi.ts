import { apiSlice } from '../../../store/apiSlice';
import type {
  AnalysesResponse,
  AnalysisResponse,
  CreateAnalysisPayload,
  MissingSkillsResponse,
  UpdateAnalysisStatusPayload,
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
    getMissingSkills: builder.query<MissingSkillsResponse, void>({
      query: () => '/analyses/missingskills',
      providesTags: ['Analysis'],
    }),
    deleteAnalysis: builder.mutation<void, string>({
      query: analysisId => ({
        url: `/analyses/${analysisId}`,
        method: 'DELETE',
      }),
    }),
    updateAnalysisStatus: builder.mutation<
      AnalysisResponse,
      UpdateAnalysisStatusPayload
    >({
      query: ({ analysisId, status }) => ({
        url: `/analyses/${analysisId}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const {
  useCreateAnalysisMutation,
  useDeleteAnalysisMutation,
  useGetAnalysesQuery,
  useGetAnalysisByIdQuery,
  useGetMissingSkillsQuery,
  useUpdateAnalysisStatusMutation,
} = analysesApi;

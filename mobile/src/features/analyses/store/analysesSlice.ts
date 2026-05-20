import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { AnalysisStatus, JobAnalysis } from '../types/analysis.types';

export type AnalysesState = {
  analysesList: JobAnalysis[];
};

const initialState: AnalysesState = {
  analysesList: [],
};

const analysesSlice = createSlice({
  name: 'analyses',
  initialState,
  reducers: {
    setAnalysesList: (state, action: PayloadAction<JobAnalysis[]>) => {
      state.analysesList = action.payload;
    },
    removeAnalysisFromList: (state, action: PayloadAction<string>) => {
      state.analysesList = state.analysesList.filter(
        analysis => analysis.id !== action.payload,
      );
    },
    updateAnalysisStatusInList: (
      state,
      action: PayloadAction<{ id: string; status: AnalysisStatus }>,
    ) => {
      state.analysesList = state.analysesList.map(analysis => {
        if (analysis.id !== action.payload.id) {
          return analysis;
        }

        return {
          ...analysis,
          status: action.payload.status,
        };
      });
    },
  },
});

export const {
  removeAnalysisFromList,
  setAnalysesList,
  updateAnalysisStatusInList,
} = analysesSlice.actions;

export default analysesSlice.reducer;

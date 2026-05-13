import {useReducer} from 'react';
import {ANALYSIS_FORM_ACTIONS} from './analysisFormActionTypes';

export type AnalysisFormState = {
  jobTitle: string;
  companyName: string;
  jobUrl: string;
  jobDescription: string;
};

export type AnalysisFormErrors = Partial<Record<keyof AnalysisFormState, string>>;

type TextFieldName = keyof AnalysisFormState;

type AnalysisFormAction =
  | {
      type: typeof ANALYSIS_FORM_ACTIONS.SET_TEXT_FIELD;
      field: TextFieldName;
      value: string;
    }
  | {
      type: typeof ANALYSIS_FORM_ACTIONS.RESET;
    };

export const MIN_JOB_DESCRIPTION_LENGTH = 80;

export const initialAnalysisFormState: AnalysisFormState = {
  jobTitle: '',
  companyName: '',
  jobUrl: '',
  jobDescription: '',
};

export const analysisFormReducer = (
  state: AnalysisFormState,
  action: AnalysisFormAction,
): AnalysisFormState => {
  switch (action.type) {
    case ANALYSIS_FORM_ACTIONS.SET_TEXT_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };

    case ANALYSIS_FORM_ACTIONS.RESET:
      return initialAnalysisFormState;

    default:
      return state;
  }
};

export const useAnalysisFormReducer = (
  initialState: AnalysisFormState = initialAnalysisFormState,
) => {
  return useReducer(analysisFormReducer, initialState);
};

export const validateAnalysisForm = (
  state: AnalysisFormState,
): AnalysisFormErrors => {
  const errors: AnalysisFormErrors = {};

  if (state.jobTitle.trim().length < 2) {
    errors.jobTitle = 'Job title is required.';
  }

  if (state.jobUrl.trim() && !state.jobUrl.trim().startsWith('http')) {
    errors.jobUrl = 'Job URL must start with http or https.';
  }

  if (state.jobDescription.trim().length < MIN_JOB_DESCRIPTION_LENGTH) {
    errors.jobDescription = `Job description must be at least ${MIN_JOB_DESCRIPTION_LENGTH} characters.`;
  }

  return errors;
};

export const isAnalysisFormValid = (errors: AnalysisFormErrors) => {
  return Object.keys(errors).length === 0;
};

import {useReducer} from 'react';
import {PROFILE_FORM_ACTIONS} from './profileFormActionTypes';

export type ProfileFormState = {
  currentTitle: string;
  yearsExperience: number;
  coreSkills: string[];
  industries: string[];
  targetRoles: string[];
  summary: string;
  remotePreference: string;
};

export type ProfileFormErrors = Partial<Record<keyof ProfileFormState, string>>;

type TextFieldName = 'currentTitle' | 'summary' | 'remotePreference';
type ChipFieldName = 'coreSkills' | 'industries' | 'targetRoles';

type ProfileFormAction =
  | {
      type: typeof PROFILE_FORM_ACTIONS.SET_TEXT_FIELD;
      field: TextFieldName;
      value: string;
    }
  | {
      type: typeof PROFILE_FORM_ACTIONS.SET_YEARS_EXPERIENCE;
      value: number;
    }
  | {
      type: typeof PROFILE_FORM_ACTIONS.INCREMENT_YEARS_EXPERIENCE;
    }
  | {
      type: typeof PROFILE_FORM_ACTIONS.DECREMENT_YEARS_EXPERIENCE;
    }
  | {
      type: typeof PROFILE_FORM_ACTIONS.SET_CHIP_FIELD;
      field: ChipFieldName;
      value: string[];
    }
  | {
      type: typeof PROFILE_FORM_ACTIONS.RESET;
      payload?: ProfileFormState;
    };

export const initialProfileFormState: ProfileFormState = {
  currentTitle: '',
  yearsExperience: 0,
  coreSkills: [],
  industries: [],
  targetRoles: [],
  summary: '',
  remotePreference: '',
};

export const profileFormReducer = (
  state: ProfileFormState,
  action: ProfileFormAction,
): ProfileFormState => {
  switch (action.type) {
    case PROFILE_FORM_ACTIONS.SET_TEXT_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };

    case PROFILE_FORM_ACTIONS.SET_YEARS_EXPERIENCE:
      return {
        ...state,
        yearsExperience: Math.max(0, action.value),
      };

    case PROFILE_FORM_ACTIONS.INCREMENT_YEARS_EXPERIENCE:
      return {
        ...state,
        yearsExperience: state.yearsExperience + 1,
      };

    case PROFILE_FORM_ACTIONS.DECREMENT_YEARS_EXPERIENCE:
      return {
        ...state,
        yearsExperience: Math.max(0, state.yearsExperience - 1),
      };

    case PROFILE_FORM_ACTIONS.SET_CHIP_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };

    case PROFILE_FORM_ACTIONS.RESET:
      return action.payload ?? initialProfileFormState;

    default:
      return state;
  }
};

export const useProfileFormReducer = (
  initialState: ProfileFormState = initialProfileFormState,
) => {
  return useReducer(profileFormReducer, initialState);
};

export const validateProfileForm = (
  state: ProfileFormState,
): ProfileFormErrors => {
  const errors: ProfileFormErrors = {};

  if (state.currentTitle.trim().length < 2) {
    errors.currentTitle = 'Current title is required.';
  }

  if (state.yearsExperience < 0) {
    errors.yearsExperience = 'Years of experience cannot be less than 0.';
  }

  if (state.coreSkills.length === 0) {
    errors.coreSkills = 'Add at least one core skill.';
  }

  if (state.industries.length === 0) {
    errors.industries = 'Add at least one industry.';
  }

  if (state.targetRoles.length === 0) {
    errors.targetRoles = 'Add at least one target role.';
  }

  if (state.summary.trim().length < 20) {
    errors.summary = 'Professional summary must be at least 20 characters.';
  }

  return errors;
};

export const isProfileFormValid = (errors: ProfileFormErrors) => {
  return Object.keys(errors).length === 0;
};

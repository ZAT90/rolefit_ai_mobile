import { SCREEN_NAMES } from './screenNames';

export type AuthStackParamList = {
  [SCREEN_NAMES.INTRO]: undefined;
  [SCREEN_NAMES.LOGIN]: undefined;
  [SCREEN_NAMES.SIGNUP]: undefined;
};

export type MainTabParamList = {
  [SCREEN_NAMES.DASHBOARD]: undefined;
  [SCREEN_NAMES.HISTORY]: undefined;
  [SCREEN_NAMES.SETTINGS]: undefined;
};

export type MainTabRouteParams = {
  screen?: keyof MainTabParamList;
};

export type AnalysisDetailRouteParams = {
  analysisId: string;
};

export type AppStackParamList = {
  [SCREEN_NAMES.PROFILE]: undefined;
  [SCREEN_NAMES.MAIN]: MainTabRouteParams | undefined;
  [SCREEN_NAMES.NEW_ANALYSIS]: undefined;
  [SCREEN_NAMES.ANALYSIS_DETAIL]: AnalysisDetailRouteParams;
  [SCREEN_NAMES.TOP_MISSING_SKILLS]: undefined;
};

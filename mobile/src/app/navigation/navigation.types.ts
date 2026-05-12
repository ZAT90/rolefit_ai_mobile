import {SCREEN_NAMES} from './screenNames';

export type AuthStackParamList = {
  [SCREEN_NAMES.INTRO]: undefined;
  [SCREEN_NAMES.LOGIN]: undefined;
  [SCREEN_NAMES.SIGNUP]: undefined;
};

export type MainTabParamList = {
  [SCREEN_NAMES.DASHBOARD]: undefined;
  [SCREEN_NAMES.HISTORY]: undefined;
};

export type AppStackParamList = {
  [SCREEN_NAMES.PROFILE]: undefined;
  [SCREEN_NAMES.MAIN]: undefined;
  [SCREEN_NAMES.NEW_ANALYSIS]: undefined;
  [SCREEN_NAMES.ANALYSIS_RESULT]: undefined;
};

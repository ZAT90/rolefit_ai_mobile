import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../../shared/components/PlaceholderScreen';
import {
  AppStackParamList,
  MainTabParamList,
} from '../../../app/navigation/navigation.types';
import {SCREEN_NAMES} from '../../../app/navigation/screenNames';

type Props = BottomTabScreenProps<
  MainTabParamList,
  typeof SCREEN_NAMES.HISTORY
>;

export const AnalysisHistoryScreen = ({navigation}: Props) => {
  const appNavigation =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <PlaceholderScreen
      title="Analysis History"
      subtitle="Saved analyses list with job title, company, fit score, date, missing skills, and status will live here."
      primaryActionLabel="Open Sample Result"
      onPrimaryAction={() =>
        appNavigation?.navigate(SCREEN_NAMES.ANALYSIS_RESULT)
      }
    />
  );
};

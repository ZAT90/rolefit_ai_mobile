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
  typeof SCREEN_NAMES.NEW_ANALYSIS
>;

export function NewAnalysisScreen({navigation}: Props) {
  const appNavigation =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <PlaceholderScreen
      title="New Job Analysis"
      subtitle="Text-only placeholder for job title, company, job URL, and a large job description field."
      primaryActionLabel="Analyze Role"
      onPrimaryAction={() =>
        appNavigation?.navigate(SCREEN_NAMES.ANALYSIS_RESULT)
      }
    />
  );
}

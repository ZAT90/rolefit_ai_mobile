import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { AppStackParamList } from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { PlaceholderScreen } from '../../../shared/components/PlaceholderScreen';

type Props = NativeStackScreenProps<
  AppStackParamList,
  typeof SCREEN_NAMES.ANALYSIS_RESULT
>;

export const AnalysisResultScreen = ({ navigation }: Props) => {
  return (
    <PlaceholderScreen
      title="Role Analysis Result"
      subtitle="Fit score, role summary, required skills, matched skills, missing skills, seniority signals, interview prep, outreach, and next actions will be shown as cards."
      primaryActionLabel="Back to Dashboard"
      onPrimaryAction={() => navigation.goBack()}
    />
  );
};

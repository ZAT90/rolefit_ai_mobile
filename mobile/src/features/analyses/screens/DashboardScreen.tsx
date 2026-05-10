import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {PlaceholderScreen} from '../../../shared/components/PlaceholderScreen';
import {MainTabParamList} from '../../../app/navigation/navigation.types';
import {SCREEN_NAMES} from '../../../app/navigation/screenNames';

type Props = BottomTabScreenProps<
  MainTabParamList,
  typeof SCREEN_NAMES.DASHBOARD
>;

export function DashboardScreen({navigation}: Props) {
  return (
    <PlaceholderScreen
      title="Dashboard"
      subtitle="Greeting, saved jobs count, average fit score, top missing skills, and recent analyses will live here."
      primaryActionLabel="Analyze New Role"
      onPrimaryAction={() => navigation.navigate(SCREEN_NAMES.NEW_ANALYSIS)}
      secondaryActionLabel="View History"
      onSecondaryAction={() => navigation.navigate(SCREEN_NAMES.HISTORY)}
    />
  );
}

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../../shared/components/PlaceholderScreen';
import {AuthStackParamList} from '../../../app/navigation/navigation.types';
import {SCREEN_NAMES} from '../../../app/navigation/screenNames';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  typeof SCREEN_NAMES.INTRO
>;

export function IntroScreen({navigation}: Props) {
  return (
    <PlaceholderScreen
      title="AI-powered career intelligence for serious job seekers."
      subtitle="Analyze roles, identify gaps, prepare interviews, and craft better outreach from one mobile workflow."
      primaryActionLabel="Get Started"
      onPrimaryAction={() => navigation.navigate(SCREEN_NAMES.SIGNUP)}
      secondaryActionLabel="I already have an account"
      onSecondaryAction={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
    />
  );
}

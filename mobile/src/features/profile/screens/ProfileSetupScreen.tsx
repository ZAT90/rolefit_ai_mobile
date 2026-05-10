import React from 'react';
import {PlaceholderScreen} from '../../../shared/components/PlaceholderScreen';
import {useAppDispatch} from '../../../store/hooks';
import {markProfileComplete} from '../../auth/store/authSlice';

export function ProfileSetupScreen() {
  const dispatch = useAppDispatch();

  return (
    <PlaceholderScreen
      title="Candidate Profile"
      subtitle="Text-only placeholder for current role, years of experience, core skills, industries, target roles, and summary."
      primaryActionLabel="Save Profile"
      onPrimaryAction={() => dispatch(markProfileComplete())}
    />
  );
}

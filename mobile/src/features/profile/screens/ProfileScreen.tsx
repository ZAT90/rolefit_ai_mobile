import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppStackParamList } from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { ChipInput } from '../../../shared/components/ChipInput';
import { CounterInput } from '../../../shared/components/CounterInput';
import { FixedBottomButton } from '../../../shared/components/FixedBottomButton';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { TextField } from '../../../shared/components/TextField';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { markProfileComplete } from '../../auth/store/authSlice';
import {
  useCreateProfileMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from '../services/profileApi';
import { PROFILE_FORM_ACTIONS } from '../state/profileFormActionTypes';
import {
  isProfileFormValid,
  ProfileFormState,
  useProfileFormReducer,
  validateProfileForm,
} from '../state/useProfileFormReducer';
import type { Profile, ProfilePayload } from '../types/profile.types';
import { profileStyles as styles } from './styles/profileStyles';

const buildProfilePayload = (state: ProfileFormState): ProfilePayload => {
  const remotePreference = state.remotePreference.trim();

  return {
    currentTitle: state.currentTitle.trim(),
    yearsExperience: state.yearsExperience,
    coreSkills: state.coreSkills,
    industries: state.industries,
    targetRoles: state.targetRoles,
    summary: state.summary.trim(),
    ...(remotePreference ? { remotePreference } : {}),
  };
};

const mapProfileToFormState = (profile: Profile): ProfileFormState => {
  return {
    currentTitle: profile.currentTitle,
    yearsExperience: profile.yearsExperience ?? 0,
    coreSkills: profile.coreSkills,
    industries: profile.industries,
    targetRoles: profile.targetRoles,
    summary: profile.summary,
    remotePreference: profile.remotePreference ?? '',
  };
};

export const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const appDispatch = useAppDispatch();
  const needsProfileSetup = useAppSelector(
    reduxState => reduxState.auth.needsProfileSetup,
  );
  const [createProfile, { isLoading: isCreatingProfile }] =
    useCreateProfileMutation();
  const [updateMyProfile, { isLoading: isUpdatingProfile }] =
    useUpdateMyProfileMutation();
  const {
    data: profileResponse,
    error: profileError,
    isFetching: isFetchingProfile,
    refetch: refetchProfile,
  } = useGetMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: needsProfileSetup,
  });
  const [state, dispatch] = useProfileFormReducer();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const errors = hasSubmitted ? validateProfileForm(state) : {};
  const isSavingProfile =
    isCreatingProfile || isUpdatingProfile || isFetchingProfile;

  useFocusEffect(
    useCallback(() => {
      if (!needsProfileSetup) {
        refetchProfile();
      }
    }, [needsProfileSetup, refetchProfile]),
  );

  useEffect(() => {
    if (!profileResponse?.profile) {
      return;
    }

    dispatch({
      type: PROFILE_FORM_ACTIONS.RESET,
      payload: mapProfileToFormState(profileResponse.profile),
    });
  }, [dispatch, profileResponse]);

  useEffect(() => {
    if (!profileError || needsProfileSetup) {
      return;
    }

    setApiErrorMessage(getApiErrorMessage(profileError));
  }, [needsProfileSetup, profileError]);

  const handleSaveProfile = async () => {
    setHasSubmitted(true);
    setApiErrorMessage('');
    const nextErrors = validateProfileForm(state);

    if (!isProfileFormValid(nextErrors)) {
      return;
    }

    try {
      const payload = buildProfilePayload(state);

      if (needsProfileSetup) {
        await createProfile(payload).unwrap();
      } else {
        await updateMyProfile(payload).unwrap();
      }

      appDispatch(markProfileComplete());

      if (needsProfileSetup) {
        navigation.reset({
          index: 0,
          routes: [{ name: SCREEN_NAMES.MAIN }],
        });
        return;
      }

      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  };

  return (
    <ScreenWrapper title="Profile">
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Candidate Profile</Text>
          <Text style={styles.subtitle}>
            {needsProfileSetup
              ? 'Set up your candidate context before running role analysis.'
              : 'Update the context RoleFit AI uses when comparing you against a role.'}
          </Text>
        </View>

        <View style={styles.form}>
          {isFetchingProfile ? (
            <Text style={styles.loadingText}>Loading saved profile...</Text>
          ) : null}

          <TextField
            errorMessage={errors.currentTitle}
            isRequired
            label="Current Title"
            onChangeText={value =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.SET_TEXT_FIELD,
                field: 'currentTitle',
                value,
              })
            }
            placeholder="Senior Mobile Engineer"
            value={state.currentTitle}
          />

          <CounterInput
            errorMessage={errors.yearsExperience}
            isRequired
            label="Years of Experience"
            onDecrement={() =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.DECREMENT_YEARS_EXPERIENCE,
              })
            }
            onIncrement={() =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.INCREMENT_YEARS_EXPERIENCE,
              })
            }
            value={state.yearsExperience}
          />

          <ChipInput
            errorMessage={errors.coreSkills}
            initialValue={state.coreSkills}
            isRequired
            label="Core Skills"
            onChange={value =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.SET_CHIP_FIELD,
                field: 'coreSkills',
                value,
              })
            }
            placeholder="Add a skill"
          />

          <ChipInput
            errorMessage={errors.industries}
            initialValue={state.industries}
            isRequired
            label="Industries"
            onChange={value =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.SET_CHIP_FIELD,
                field: 'industries',
                value,
              })
            }
            placeholder="Add an industry"
          />

          <ChipInput
            errorMessage={errors.targetRoles}
            initialValue={state.targetRoles}
            isRequired
            label="Target Roles"
            onChange={value =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.SET_CHIP_FIELD,
                field: 'targetRoles',
                value,
              })
            }
            placeholder="Add a target role"
          />

          <TextField
            errorMessage={errors.summary}
            isRequired
            label="Professional Summary"
            multiline
            onChangeText={value =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.SET_TEXT_FIELD,
                field: 'summary',
                value,
              })
            }
            placeholder="Summarize your background, product domains, and strengths."
            style={styles.summaryInput}
            textAlignVertical="top"
            value={state.summary}
          />

          <TextField
            errorMessage={errors.remotePreference}
            isRequired={false}
            label="Remote / Location Preference"
            onChangeText={value =>
              dispatch({
                type: PROFILE_FORM_ACTIONS.SET_TEXT_FIELD,
                field: 'remotePreference',
                value,
              })
            }
            placeholder="Remote-first, hybrid Bangkok, US timezone overlap"
            value={state.remotePreference}
          />

          {apiErrorMessage ? (
            <Text style={styles.apiErrorText}>{apiErrorMessage}</Text>
          ) : null}
        </View>
      </ScrollView>
      <FixedBottomButton
        isLoading={isSavingProfile}
        label="Save Profile"
        onPress={handleSaveProfile}
      />
    </ScreenWrapper>
  );
};

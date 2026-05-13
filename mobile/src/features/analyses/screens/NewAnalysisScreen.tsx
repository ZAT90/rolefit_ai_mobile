import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { AppStackParamList } from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { FixedBottomButton } from '../../../shared/components/FixedBottomButton';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { TextField } from '../../../shared/components/TextField';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';
import { useCreateAnalysisMutation } from '../services/analysesApi';
import { ANALYSIS_FORM_ACTIONS } from '../state/analysisFormActionTypes';
import {
  AnalysisFormState,
  MIN_JOB_DESCRIPTION_LENGTH,
  isAnalysisFormValid,
  useAnalysisFormReducer,
  validateAnalysisForm,
} from '../state/useAnalysisFormReducer';
import { newAnalysisStyles as styles } from './styles/newAnalysisStyles';

type Props = NativeStackScreenProps<
  AppStackParamList,
  typeof SCREEN_NAMES.NEW_ANALYSIS
>;

const buildAnalysisPayload = (state: AnalysisFormState) => {
  const companyName = state.companyName.trim();
  const jobUrl = state.jobUrl.trim();

  return {
    jobTitle: state.jobTitle.trim(),
    ...(companyName ? { companyName } : {}),
    ...(jobUrl ? { jobUrl } : {}),
    jobDescription: state.jobDescription.trim(),
  };
};

export const NewAnalysisScreen = ({ navigation }: Props) => {
  const [state, dispatch] = useAnalysisFormReducer();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [createAnalysis, { isLoading }] = useCreateAnalysisMutation();
  const errors = hasSubmitted ? validateAnalysisForm(state) : {};

  const handleAnalyzeRole = async () => {
    setHasSubmitted(true);
    setApiErrorMessage('');

    const nextErrors = validateAnalysisForm(state);

    if (!isAnalysisFormValid(nextErrors)) {
      return;
    }

    try {
      await createAnalysis(buildAnalysisPayload(state)).unwrap();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: SCREEN_NAMES.MAIN,
            params: { screen: SCREEN_NAMES.HISTORY },
          },
        ],
      });
    } catch (error) {
      setApiErrorMessage(getApiErrorMessage(error));
    }
  };

  return (
    <ScreenWrapper title="New Analysis">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>RoleFit AI</Text>
            <Text style={styles.title}>Analyze New Role</Text>
            <Text style={styles.subtitle}>
              Add the job details so RoleFit AI can compare the role against
              your candidate profile.
            </Text>
          </View>

          <View style={styles.form}>
            <TextField
              autoCapitalize="words"
              errorMessage={errors.jobTitle}
              isRequired
              label="Job Title"
              onChangeText={value =>
                dispatch({
                  type: ANALYSIS_FORM_ACTIONS.SET_TEXT_FIELD,
                  field: 'jobTitle',
                  value,
                })
              }
              placeholder="Senior React Native Engineer"
              value={state.jobTitle}
            />

            <TextField
              autoCapitalize="words"
              errorMessage={errors.companyName}
              label="Company Name"
              onChangeText={value =>
                dispatch({
                  type: ANALYSIS_FORM_ACTIONS.SET_TEXT_FIELD,
                  field: 'companyName',
                  value,
                })
              }
              placeholder="Example AI Startup"
              value={state.companyName}
            />

            <TextField
              autoCapitalize="none"
              autoCorrect={false}
              errorMessage={errors.jobUrl}
              keyboardType="url"
              label="Job URL"
              onChangeText={value =>
                dispatch({
                  type: ANALYSIS_FORM_ACTIONS.SET_TEXT_FIELD,
                  field: 'jobUrl',
                  value,
                })
              }
              placeholder="https://company.com/careers/role"
              value={state.jobUrl}
            />

            <TextField
              errorMessage={errors.jobDescription}
              isRequired
              label="Job Description"
              multiline
              onChangeText={value =>
                dispatch({
                  type: ANALYSIS_FORM_ACTIONS.SET_TEXT_FIELD,
                  field: 'jobDescription',
                  value,
                })
              }
              placeholder="Paste the job description here..."
              style={styles.descriptionInput}
              value={state.jobDescription}
            />

            <Text style={styles.characterCount}>
              {state.jobDescription.trim().length}/{MIN_JOB_DESCRIPTION_LENGTH}{' '}
              minimum characters
            </Text>

            {apiErrorMessage ? (
              <Text style={styles.errorText}>{apiErrorMessage}</Text>
            ) : null}

            {/* <Pressable
              disabled={isLoading}
              onPress={handleAnalyzeRole}
              style={({ pressed }) => [
                styles.primaryButton,
                (pressed || isLoading) && styles.primaryButtonPressed,
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#101820" />
              ) : (
                <Text style={styles.primaryButtonText}>Analyze Role</Text>
              )}
            </Pressable> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FixedBottomButton
        isLoading={isLoading}
        label="Analyze Role"
        onPress={handleAnalyzeRole}
      />
    </ScreenWrapper>
  );
};

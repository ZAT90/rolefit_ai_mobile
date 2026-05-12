import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../../../shared/components/PlaceholderScreen';
import {AppStackParamList} from '../../../app/navigation/navigation.types';
import {SCREEN_NAMES} from '../../../app/navigation/screenNames';

type Props = NativeStackScreenProps<
  AppStackParamList,
  typeof SCREEN_NAMES.NEW_ANALYSIS
>;

export const NewAnalysisScreen = ({navigation}: Props) => {
  return (
    <PlaceholderScreen
      title="New Job Analysis"
      subtitle="Text-only placeholder for job title, company, job URL, and a large job description field."
      primaryActionLabel="Analyze Role"
      onPrimaryAction={() => navigation.navigate(SCREEN_NAMES.ANALYSIS_RESULT)}
    />
  );
};

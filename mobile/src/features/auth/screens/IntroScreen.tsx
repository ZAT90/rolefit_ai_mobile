import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { PlaceholderScreen } from '../../../shared/components/PlaceholderScreen';
import { markIntroSeen } from '../../../shared/lib/onboardingStorage';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  typeof SCREEN_NAMES.INTRO
>;

export const IntroScreen = ({ navigation }: Props) => {
  const handleGetStarted = async () => {
    await markIntroSeen();
    navigation.replace(SCREEN_NAMES.SIGNUP);
  };

  const handleLogin = async () => {
    await markIntroSeen();
    navigation.replace(SCREEN_NAMES.LOGIN);
  };

  return (
    <PlaceholderScreen
      title="AI-powered career intelligence for serious job seekers."
      subtitle="Analyze roles, identify gaps, prepare interviews, and craft better outreach from one mobile workflow."
      primaryActionLabel="Get Started"
      onPrimaryAction={handleGetStarted}
      secondaryActionLabel="I already have an account"
      onSecondaryAction={handleLogin}
    />
  );
};

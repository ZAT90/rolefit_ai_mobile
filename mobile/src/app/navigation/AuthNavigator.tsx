import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IntroScreen } from '../../features/auth/screens/IntroScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { SignupScreen } from '../../features/auth/screens/SignupScreen';
import { SplashScreen } from '../../features/auth/screens/SplashScreen';
import { getHasSeenIntro } from '../../shared/lib/onboardingStorage';
import { AuthStackParamList } from './navigation.types';
import { SCREEN_NAMES } from './screenNames';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const [initialRouteName, setInitialRouteName] = useState<
    keyof AuthStackParamList | null
  >(null);

  useEffect(() => {
    const loadInitialRoute = async () => {
      const hasSeenIntro = await getHasSeenIntro();
      setInitialRouteName(
        hasSeenIntro ? SCREEN_NAMES.LOGIN : SCREEN_NAMES.INTRO,
      );
    };

    loadInitialRoute();
  }, []);

  if (!initialRouteName) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        contentStyle: { backgroundColor: '#101820' },
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.INTRO} component={IntroScreen} />
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
};

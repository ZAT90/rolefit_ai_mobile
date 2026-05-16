import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AnalysisDetailScreen } from '../../features/analyses/screens/AnalysisDetailScreen';
import { NewAnalysisScreen } from '../../features/analyses/screens/NewAnalysisScreen';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';
import { useAppSelector } from '../../store/hooks';
import { MainTabs } from './MainTabs';
import { AppStackParamList } from './navigation.types';
import { SCREEN_NAMES } from './screenNames';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const needsProfileSetup = useAppSelector(
    state => state.auth.needsProfileSetup,
  );

  if (needsProfileSetup) {
    return (
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#101820' },
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAMES.PROFILE} component={ProfileScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#101820' },
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.MAIN} component={MainTabs} />
      <Stack.Screen name={SCREEN_NAMES.PROFILE} component={ProfileScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.NEW_ANALYSIS}
        component={NewAnalysisScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ANALYSIS_DETAIL}
        component={AnalysisDetailScreen}
      />
    </Stack.Navigator>
  );
};

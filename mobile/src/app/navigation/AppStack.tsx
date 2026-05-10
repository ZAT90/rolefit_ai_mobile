import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AnalysisResultScreen} from '../../features/analyses/screens/AnalysisResultScreen';
import {ProfileSetupScreen} from '../../features/profile/screens/ProfileSetupScreen';
import {useAppSelector} from '../../store/hooks';
import {MainTabs} from './MainTabs';
import {AppStackParamList} from './navigation.types';
import {SCREEN_NAMES} from './screenNames';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  const needsProfileSetup = useAppSelector(
    state => state.auth.needsProfileSetup,
  );

  if (needsProfileSetup) {
    return (
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: '#101820'},
          headerShown: false,
        }}>
        <Stack.Screen
          name={SCREEN_NAMES.PROFILE_SETUP}
          component={ProfileSetupScreen}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: '#101820'},
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN_NAMES.MAIN} component={MainTabs} />
      <Stack.Screen
        name={SCREEN_NAMES.PROFILE_SETUP}
        component={ProfileSetupScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ANALYSIS_RESULT}
        component={AnalysisResultScreen}
      />
    </Stack.Navigator>
  );
}

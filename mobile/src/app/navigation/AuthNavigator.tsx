import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IntroScreen} from '../../features/auth/screens/IntroScreen';
import {LoginScreen} from '../../features/auth/screens/LoginScreen';
import {SignupScreen} from '../../features/auth/screens/SignupScreen';
import {AuthStackParamList} from './navigation.types';
import {SCREEN_NAMES} from './screenNames';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: '#101820'},
        headerShown: false,
      }}>
      <Stack.Screen name={SCREEN_NAMES.INTRO} component={IntroScreen} />
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAMES.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
};

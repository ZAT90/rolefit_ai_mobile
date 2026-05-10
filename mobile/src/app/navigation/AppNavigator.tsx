import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigator';
import {AppStack} from './AppStack';
import {SplashScreen} from '../../features/auth/screens/SplashScreen';
import {useAppSelector} from '../../store/hooks';

export function AppNavigator() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const [isSplashDone, setIsSplashDone] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSplashDone(true);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isSplashDone) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

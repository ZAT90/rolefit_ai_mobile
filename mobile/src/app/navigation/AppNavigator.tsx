import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigator';
import {AppStack} from './AppStack';
import {useAuthSession} from '../../features/auth/hooks/useAuthSession';
import {SplashScreen} from '../../features/auth/screens/SplashScreen';
import {useAppSelector} from '../../store/hooks';

export const AppNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const {hasStoredToken, isCheckingToken} = useAuthSession(isAuthenticated);
  const [isSplashDone, setIsSplashDone] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSplashDone(true);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isSplashDone || isCheckingToken) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated && hasStoredToken ? <AppStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

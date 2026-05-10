import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './src/app/navigation/AppNavigator';
import {SplashScreen} from './src/features/auth/screens/SplashScreen';
import {persistor, store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

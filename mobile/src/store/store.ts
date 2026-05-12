import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import type { AuthState } from '../features/auth/store/authSlice';
import authReducer from '../features/auth/store/authSlice';
import { apiSlice } from './apiSlice';

const logger = createLogger({
  collapsed: true,
  duration: true,
});

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'isAuthenticated', 'needsProfileSetup'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer<AuthState>(authPersistConfig, authReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware);

    if (__DEV__) {
      return middleware.concat(logger);
    }

    return middleware;
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

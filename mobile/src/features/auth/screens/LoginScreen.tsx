import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AuthStackParamList} from '../../../app/navigation/navigation.types';
import {SCREEN_NAMES} from '../../../app/navigation/screenNames';
import {useAppDispatch} from '../../../store/hooks';
import {getApiErrorMessage} from '../../../shared/lib/getApiErrorMessage';
import {ScreenWrapper} from '../../../shared/components/ScreenWrapper';
import {useLoginMutation} from '../services/authApi';
import {setCredentials} from '../store/authSlice';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  typeof SCREEN_NAMES.LOGIN
>;

export const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [login, {isLoading}] = useLoginMutation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    try {
      const result = await login({
        email: email.trim(),
        password,
      }).unwrap();

      dispatch(setCredentials(result));
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    }
  };

  return (
    <ScreenWrapper title="Login">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>RoleFit AI</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your role-fit workflow.
          </Text>

          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#64748b"
              style={styles.input}
              value={email}
            />
            <TextInput
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#64748b"
              secureTextEntry
              style={styles.input}
              value={password}
            />

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <Pressable
              disabled={isLoading}
              onPress={handleLogin}
              style={({pressed}) => [
                styles.primaryButton,
                (pressed || isLoading) && styles.buttonPressed,
              ]}>
              {isLoading ? (
                <ActivityIndicator color="#101820" />
              ) : (
                <Text style={styles.primaryButtonText}>Login</Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate(SCREEN_NAMES.SIGNUP)}
              style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Create account</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#8fb8ff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  form: {
    gap: 14,
  },
  input: {
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    color: '#f8fafc',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    minHeight: 52,
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  primaryButtonText: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#dbeafe',
    fontSize: 15,
    fontWeight: '700',
  },
});

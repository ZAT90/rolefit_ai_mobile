import {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import {saveToken} from '../utils/authSession';
import {loginStyles as styles} from './styles/loginStyles';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  typeof SCREEN_NAMES.LOGIN
>;

export const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [login, {isLoading}] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    try {
      const result = await login({
        email: email.trim(),
        password,
      }).unwrap();

      await saveToken(result.token);
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

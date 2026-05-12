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
import {useRegisterMutation} from '../services/authApi';
import {setCredentials} from '../store/authSlice';
import {saveToken} from '../utils/authSession';
import {signupStyles as styles} from './styles/signupStyles';

type Props = NativeStackScreenProps<
  AuthStackParamList,
  typeof SCREEN_NAMES.SIGNUP
>;

export const SignupScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [register, {isLoading}] = useRegisterMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    setErrorMessage('');

    try {
      const result = await register({
        name: name.trim(),
        email: email.trim(),
        password,
      }).unwrap();

      await saveToken(result.token);
      dispatch(setCredentials({...result, needsProfileSetup: true}));
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    }
  };

  return (
    <ScreenWrapper title="Create Account">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.eyebrow}>RoleFit AI</Text>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Start with an account, then build your candidate profile.
          </Text>

          <View style={styles.form}>
            <TextInput
              autoCapitalize="words"
              onChangeText={setName}
              placeholder="Name"
              placeholderTextColor="#64748b"
              style={styles.input}
              value={name}
            />
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
              onPress={handleSignup}
              style={({pressed}) => [
                styles.primaryButton,
                (pressed || isLoading) && styles.buttonPressed,
              ]}>
              {isLoading ? (
                <ActivityIndicator color="#101820" />
              ) : (
                <Text style={styles.primaryButtonText}>Create Account</Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
              style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Back to login</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

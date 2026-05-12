import {ActivityIndicator, Text, View} from 'react-native';
import {splashStyles as styles} from './styles/splashStyles';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RoleFit AI</Text>
      <Text style={styles.subtitle}>Career intelligence for serious roles</Text>
      <ActivityIndicator color="#8fb8ff" style={styles.loader} />
    </View>
  );
};

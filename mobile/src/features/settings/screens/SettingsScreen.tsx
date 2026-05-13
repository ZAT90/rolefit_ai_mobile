import {Pressable, Text, View} from 'react-native';
import {ScreenWrapper} from '../../../shared/components/ScreenWrapper';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {logoutAuth} from '../../auth/utils/authSession';
import {settingsStyles as styles} from './styles/settingsStyles';

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogout = async () => {
    await logoutAuth(dispatch);
  };

  return (
    <ScreenWrapper title="Settings">
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Account</Text>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your RoleFit AI session.</Text>
        </View>

        <View style={styles.accountCard}>
          <Text style={styles.label}>Signed in as</Text>
          <Text numberOfLines={1} style={styles.userName}>
            {user?.name ?? 'RoleFit user'}
          </Text>
          <Text numberOfLines={1} style={styles.userEmail}>
            {user?.email ?? ''}
          </Text>
        </View>

        <Pressable
          onPress={handleLogout}
          style={({pressed}) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

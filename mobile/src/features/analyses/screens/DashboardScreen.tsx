import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, Text, View} from 'react-native';
import {
  AppStackParamList,
  MainTabParamList,
} from '../../../app/navigation/navigation.types';
import {SCREEN_NAMES} from '../../../app/navigation/screenNames';
import {ScreenWrapper} from '../../../shared/components/ScreenWrapper';
import {dashboardStyles as styles} from './styles/dashboardStyles';

type Props = BottomTabScreenProps<
  MainTabParamList,
  typeof SCREEN_NAMES.DASHBOARD
>;

export const DashboardScreen = ({navigation}: Props) => {
  const appNavigation =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();

  const profileButton = (
    <Pressable
      accessibilityLabel="Open profile"
      onPress={() => appNavigation?.navigate(SCREEN_NAMES.PROFILE)}
      style={({pressed}) => [
        styles.profileButton,
        pressed && styles.profileButtonPressed,
      ]}>
      <View style={styles.profileIconHead} />
      <View style={styles.profileIconBody} />
    </Pressable>
  );

  return (
    <ScreenWrapper
      rightElement={profileButton}
      showBackButton={false}
      title="Dashboard">
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>RoleFit AI</Text>
          <Text style={styles.title}>Career intelligence dashboard</Text>
          <Text style={styles.subtitle}>
            Track role analyses, skill gaps, outreach drafts, and interview prep
            from one workflow.
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Saved roles</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>--</Text>
            <Text style={styles.statLabel}>Avg fit</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top missing skills</Text>
          <Text style={styles.emptyText}>
            Run your first role analysis to see recurring skill gaps.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => appNavigation?.navigate(SCREEN_NAMES.NEW_ANALYSIS)}
            style={({pressed}) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}>
            <Text style={styles.primaryButtonText}>Analyze New Role</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate(SCREEN_NAMES.HISTORY)}
            style={({pressed}) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}>
            <Text style={styles.secondaryButtonText}>View History</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

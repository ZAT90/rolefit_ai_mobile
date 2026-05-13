import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons, {
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons/static';
import {DashboardScreen} from '../../features/analyses/screens/DashboardScreen';
import {AnalysisHistoryScreen} from '../../features/analyses/screens/AnalysisHistoryScreen';
import {SettingsScreen} from '../../features/settings/screens/SettingsScreen';
import {MainTabParamList} from './navigation.types';
import {SCREEN_NAMES} from './screenNames';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {
  color: string;
  focused: boolean;
  size: number;
};

const renderTabIcon = (focusedName: IoniconsIconName, name: IoniconsIconName) => {
  return ({color, focused, size}: TabIconProps) => (
    <Ionicons color={color} name={focused ? focusedName : name} size={size} />
  );
};

const dashboardTabIcon = renderTabIcon('home', 'home-outline');
const analysisTabIcon = renderTabIcon('analytics', 'analytics-outline');
const settingsTabIcon = renderTabIcon('settings', 'settings-outline');

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8fb8ff',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {backgroundColor: '#101820', borderTopColor: '#1e293b'},
      }}>
      <Tab.Screen
        name={SCREEN_NAMES.DASHBOARD}
        component={DashboardScreen}
        options={{tabBarIcon: dashboardTabIcon}}
      />
      <Tab.Screen
        name={SCREEN_NAMES.HISTORY}
        component={AnalysisHistoryScreen}
        options={{tabBarIcon: analysisTabIcon, title: 'Analyze'}}
      />
      <Tab.Screen
        name={SCREEN_NAMES.SETTINGS}
        component={SettingsScreen}
        options={{tabBarIcon: settingsTabIcon, title: 'Settings'}}
      />
    </Tab.Navigator>
  );
};

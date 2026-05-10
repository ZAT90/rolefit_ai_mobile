import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardScreen} from '../../features/analyses/screens/DashboardScreen';
import {NewAnalysisScreen} from '../../features/analyses/screens/NewAnalysisScreen';
import {AnalysisHistoryScreen} from '../../features/analyses/screens/AnalysisHistoryScreen';
import {MainTabParamList} from './navigation.types';
import {SCREEN_NAMES} from './screenNames';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8fb8ff',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {backgroundColor: '#101820', borderTopColor: '#1e293b'},
      }}>
      <Tab.Screen name={SCREEN_NAMES.DASHBOARD} component={DashboardScreen} />
      <Tab.Screen
        name={SCREEN_NAMES.NEW_ANALYSIS}
        component={NewAnalysisScreen}
        options={{title: 'Analyze'}}
      />
      <Tab.Screen name={SCREEN_NAMES.HISTORY} component={AnalysisHistoryScreen} />
    </Tab.Navigator>
  );
}

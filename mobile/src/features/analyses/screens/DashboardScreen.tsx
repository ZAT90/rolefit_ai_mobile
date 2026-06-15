import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
  AppStackParamList,
  MainTabParamList,
} from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AnalysisStatusBadge } from '../components/AnalysisStatusBadge';
import { useGetAnalysesQuery } from '../services/analysesApi';
import { setAnalysesList } from '../store/analysesSlice';
import type { JobAnalysis } from '../types/analysis.types';
import { dashboardStyles as styles } from './styles/dashboardStyles';

type Props = BottomTabScreenProps<
  MainTabParamList,
  typeof SCREEN_NAMES.DASHBOARD
>;

const getAverageFitScore = (analyses: JobAnalysis[]) => {
  if (analyses.length === 0) {
    return '--';
  }

  const totalFitScore = analyses.reduce((total, analysis) => {
    return total + (analysis.fitScore ?? 0);
  }, 0);

  return Math.round(totalFitScore / analyses.length);
};

export const DashboardScreen = ({ navigation }: Props) => {
  const appNavigation =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();
  const dispatch = useAppDispatch();
  const analyses = useAppSelector(state => state.analyses.analysesList);
  const { data, error, isFetching, isLoading, refetch } = useGetAnalysesQuery();
  const recentAnalyses = analyses.slice(0, 3);
  const averageFitScore = getAverageFitScore(analyses);

  useEffect(() => {
    if (data?.analyses) {
      dispatch(setAnalysesList(data.analyses));
    }
  }, [data, dispatch]);

  const profileButton = (
    <Pressable
      accessibilityLabel="Open profile"
      onPress={() => appNavigation?.navigate(SCREEN_NAMES.PROFILE)}
      style={({ pressed }) => [
        styles.profileButton,
        pressed && styles.profileButtonPressed,
      ]}
    >
      <View style={styles.profileIconHead} />
      <View style={styles.profileIconBody} />
    </Pressable>
  );

  return (
    <ScreenWrapper
      rightElement={profileButton}
      showBackButton={false}
      title="Dashboard"
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
            <Text style={styles.statValue}>{analyses.length}</Text>
            <Text style={styles.statLabel}>Saved roles</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{averageFitScore}</Text>
            <Text style={styles.statLabel}>Avg fit</Text>
          </View>
        </View>

        {error ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateTitle}>Could not load dashboard</Text>
            <Text style={styles.stateText}>{getApiErrorMessage(error)}</Text>
            <Pressable onPress={refetch} style={styles.inlineButton}>
              <Text style={styles.inlineButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateTitle}>Loading dashboard</Text>
            <Text style={styles.stateText}>
              Pulling your saved role analyses.
            </Text>
          </View>
        ) : null}

        <Pressable
          onPress={() =>
            appNavigation?.navigate(SCREEN_NAMES.TOP_MISSING_SKILLS)
          }
          style={({ pressed }) => [
            styles.insightsCard,
            pressed && styles.buttonPressed,
          ]}
        >
          <View style={styles.insightsIconBox}>
            <Ionicons color="#dbeafe" name="bar-chart-outline" size={22} />
          </View>
          <View style={styles.insightsTextBox}>
            <Text style={styles.sectionTitle}>Top missing skills</Text>
            <Text style={styles.insightsText}>
              Review recurring skill gaps across analyzed roles.
            </Text>
          </View>
          <Ionicons color="#8fb8ff" name="chevron-forward" size={22} />
        </Pressable>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent analyses</Text>
            {isFetching && !isLoading ? (
              <Text style={styles.syncText}>Syncing</Text>
            ) : null}
          </View>

          {recentAnalyses.length > 0 ? (
            <View style={styles.recentList}>
              {recentAnalyses.map(analysis => (
                <Pressable
                  key={analysis.id}
                  onPress={() =>
                    appNavigation?.navigate(SCREEN_NAMES.ANALYSIS_DETAIL, {
                      analysisId: analysis.id,
                    })
                  }
                  style={({ pressed }) => [
                    styles.recentCard,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <View style={styles.recentInfo}>
                    <Text numberOfLines={1} style={styles.recentTitle}>
                      {analysis.jobTitle}
                    </Text>
                    <Text numberOfLines={1} style={styles.recentCompany}>
                      {analysis.companyName || 'Company not provided'}
                    </Text>
                    <AnalysisStatusBadge status={analysis.status} />
                  </View>
                  <View style={styles.recentScoreBox}>
                    <Text style={styles.recentScore}>
                      {analysis.fitScore ?? '--'}
                    </Text>
                    <Text style={styles.recentScoreLabel}>Fit</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>
              Run your first role analysis to populate this dashboard.
            </Text>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

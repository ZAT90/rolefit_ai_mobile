import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {ListRenderItem} from 'react-native';
import {FlatList, Pressable, Text, View} from 'react-native';
import {
  AppStackParamList,
  MainTabParamList,
} from '../../../app/navigation/navigation.types';
import {SCREEN_NAMES} from '../../../app/navigation/screenNames';
import {ScreenWrapper} from '../../../shared/components/ScreenWrapper';
import {getApiErrorMessage} from '../../../shared/lib/getApiErrorMessage';
import {useGetAnalysesQuery} from '../services/analysesApi';
import type {JobAnalysis} from '../types/analysis.types';
import {analysisHistoryStyles as styles} from './styles/analysisHistoryStyles';

type Props = BottomTabScreenProps<
  MainTabParamList,
  typeof SCREEN_NAMES.HISTORY
>;

const formatStatus = (status: string) => {
  return status.replace('_', ' ');
};

const getScoreLabel = (fitScore: number | null) => {
  if (fitScore === null) {
    return '--';
  }

  return String(fitScore);
};

export const AnalysisHistoryScreen = ({navigation}: Props) => {
  const appNavigation =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();
  const {data, error, isFetching, isLoading, refetch} = useGetAnalysesQuery();

  const analyses = data?.analyses ?? [];

  const renderAnalysisItem: ListRenderItem<JobAnalysis> = ({item}) => {
    return (
      <Pressable
        onPress={() => appNavigation?.navigate(SCREEN_NAMES.ANALYSIS_RESULT)}
        style={({pressed}) => [
          styles.analysisCard,
          pressed && styles.analysisCardPressed,
        ]}>
        <View style={styles.analysisInfo}>
          <Text numberOfLines={1} style={styles.jobTitle}>
            {item.jobTitle}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.roleSummary}>
            {item.roleSummary ?? 'Analysis summary is not available yet.'}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{formatStatus(item.status)}</Text>
          </View>
        </View>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreValue}>{getScoreLabel(item.fitScore)}</Text>
          <Text style={styles.scoreLabel}>Fit</Text>
        </View>
      </Pressable>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.stateBox}>
          <Text style={styles.stateTitle}>Loading analyses</Text>
          <Text style={styles.stateText}>
            Pulling your saved role intelligence from the backend.
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.stateBox}>
          <Text style={styles.stateTitle}>Could not load analyses</Text>
          <Text style={styles.stateText}>{getApiErrorMessage(error)}</Text>
          <Pressable onPress={refetch} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <FlatList
        contentContainerStyle={styles.listContent}
        data={analyses}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.stateBox}>
            <Text style={styles.stateTitle}>No analyses yet</Text>
            <Text style={styles.stateText}>
              Run your first role analysis to start building saved history.
            </Text>
          </View>
        }
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        renderItem={renderAnalysisItem}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <ScreenWrapper showBackButton={false} title="Analyze">
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>RoleFit AI</Text>
          <Text style={styles.title}>Role Analyses</Text>
          <Text style={styles.subtitle}>
            Review saved roles, fit scores, statuses, and one-line summaries.
          </Text>
        </View>

        <Pressable
          onPress={() => appNavigation?.navigate(SCREEN_NAMES.NEW_ANALYSIS)}
          style={({pressed}) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}>
          <Text style={styles.primaryButtonText}>Analyze New Role</Text>
        </Pressable>

        {renderContent()}
      </View>
    </ScreenWrapper>
  );
};

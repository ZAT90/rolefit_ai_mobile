import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons/static';
import { useEffect, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, Pressable, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  AppStackParamList,
  MainTabParamList,
} from '../../../app/navigation/navigation.types';
import { SCREEN_NAMES } from '../../../app/navigation/screenNames';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { AnalysisStatusBadge } from '../components/AnalysisStatusBadge';
import {
  useDeleteAnalysisMutation,
  useGetAnalysesQuery,
} from '../services/analysesApi';
import {
  removeAnalysisFromList,
  setAnalysesList,
} from '../store/analysesSlice';
import type { JobAnalysis } from '../types/analysis.types';
import { analysisHistoryStyles as styles } from './styles/analysisHistoryStyles';

type Props = BottomTabScreenProps<
  MainTabParamList,
  typeof SCREEN_NAMES.HISTORY
>;

const getScoreLabel = (fitScore: number | null) => {
  if (fitScore === null) {
    return '--';
  }

  return String(fitScore);
};

export const AnalysisHistoryScreen = ({ navigation }: Props) => {
  const appNavigation =
    navigation.getParent<NativeStackNavigationProp<AppStackParamList>>();
  const dispatch = useAppDispatch();
  const analyses = useAppSelector(state => state.analyses.analysesList);
  const { data, error, isFetching, isLoading, refetch } = useGetAnalysesQuery();
  const [deleteAnalysis, { isLoading: isDeletingAnalysis }] =
    useDeleteAnalysisMutation();
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  useEffect(() => {
    dispatch(setAnalysesList(data?.analyses ?? []));
  }, [data, dispatch]);

  const handleDeleteAnalysis = async (analysisId: string) => {
    setDeleteErrorMessage('');

    try {
      await deleteAnalysis(analysisId).unwrap();
      dispatch(removeAnalysisFromList(analysisId));
    } catch (deleteError) {
      setDeleteErrorMessage(getApiErrorMessage(deleteError));
    }
  };

  const renderRightActions = (item: JobAnalysis) => {
    return (
      <Pressable
        disabled={isDeletingAnalysis}
        onPress={() => handleDeleteAnalysis(item.id)}
        style={({ pressed }) => [
          styles.deleteAction,
          pressed && styles.deleteActionPressed,
        ]}
      >
        <Ionicons color="#fef2f2" name="trash-outline" size={22} />
        <Text style={styles.deleteActionText}>Delete</Text>
      </Pressable>
    );
  };

  const renderAnalysisItem: ListRenderItem<JobAnalysis> = ({ item }) => {
    return (
      <Swipeable
        friction={2}
        overshootRight={false}
        renderRightActions={() => renderRightActions(item)}
      >
        <Pressable
          onPress={() =>
            appNavigation?.navigate(SCREEN_NAMES.ANALYSIS_DETAIL, {
              analysisId: item.id,
            })
          }
          style={({ pressed }) => [
            styles.analysisCard,
            pressed && styles.analysisCardPressed,
          ]}
        >
          <View style={styles.analysisInfo}>
            <Text numberOfLines={1} style={styles.jobTitle}>
              {item.jobTitle}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.roleSummary}
            >
              {item.roleSummary ?? 'Analysis summary is not available yet.'}
            </Text>
            <AnalysisStatusBadge status={item.status} />
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreValue}>
              {getScoreLabel(item.fitScore)}
            </Text>
            <Text style={styles.scoreLabel}>Fit</Text>
          </View>
        </Pressable>
      </Swipeable>
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
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Analyze New Role</Text>
        </Pressable>

        {deleteErrorMessage ? (
          <Text style={styles.actionErrorText}>{deleteErrorMessage}</Text>
        ) : null}

        {renderContent()}
      </View>
    </ScreenWrapper>
  );
};

import { Pressable, ScrollView, Text, View } from 'react-native';
import { ScreenWrapper } from '../../../shared/components/ScreenWrapper';
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage';
import { SkillBar } from '../components/SkillBar';
import { useGetMissingSkillsQuery } from '../services/analysesApi';
import { topMissingSkillsStyles as styles } from './styles/topMissingSkillsStyles';

const barColors = ['#8fb8ff', '#22c55e', '#f59e0b', '#ec4899', '#a78bfa'];

export const TopMissingSkillsScreen = () => {
  const { data, error, isFetching, isLoading, refetch } =
    useGetMissingSkillsQuery();
  const missingSkills = data?.missingSkills ?? [];
  const maxCount = missingSkills[0]?.count ?? 0;

  return (
    <ScreenWrapper title="Skill Gaps">
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>RoleFit AI</Text>
        <Text style={styles.title}>Top missing skills</Text>
        <Text style={styles.subtitle}>
          Ranked skill gaps based on the missing skills found across your saved
          role analyses.
        </Text>

        {error ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Could not load skill gaps</Text>
            <Text style={styles.stateText}>{getApiErrorMessage(error)}</Text>
            <Pressable onPress={refetch} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Loading skill gaps</Text>
            <Text style={styles.stateText}>
              Counting missing skills across saved analyses.
            </Text>
          </View>
        ) : null}

        {!isLoading && !error && missingSkills.length > 0 ? (
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Top 5 gaps</Text>
              {isFetching ? <Text style={styles.syncText}>Syncing</Text> : null}
            </View>

            <View style={styles.chartList}>
              {missingSkills.map((skill, index) => (
                <SkillBar
                  color={barColors[index % barColors.length]}
                  key={`${skill.skill}-${index}`}
                  maxCount={maxCount}
                  rank={index + 1}
                  skill={skill}
                />
              ))}
            </View>
          </View>
        ) : null}

        {!isLoading && !error && missingSkills.length === 0 ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>No missing skills yet</Text>
            <Text style={styles.stateText}>
              Run role analyses with structured AI output to see recurring skill
              gaps here.
            </Text>
          </View>
        ) : null}

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>How this is calculated</Text>
          <Text style={styles.noteText}>
            The backend counts repeated missing skills from saved analyses and
            returns the top five results.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

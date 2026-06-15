import { Text, View } from 'react-native';
import type { MissingSkillInsight } from '../types/analysis.types';
import { skillBarStyles as styles } from './styles/skillBarStyles';

type SkillBarProps = {
  color: string;
  maxCount: number;
  rank: number;
  skill: MissingSkillInsight;
};

export const SkillBar = ({ color, maxCount, rank, skill }: SkillBarProps) => {
  const widthPercent = maxCount > 0 ? (skill.count / maxCount) * 100 : 0;

  return (
    <View style={styles.skillRow}>
      <View style={[styles.rankBadge, { backgroundColor: color }]}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>

      <View style={styles.skillContent}>
        <View style={styles.skillHeader}>
          <Text numberOfLines={1} style={styles.skillName}>
            {skill.skill}
          </Text>
          <Text style={styles.skillCount}>{skill.count} roles</Text>
        </View>

        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              {
                backgroundColor: color,
                width: `${widthPercent}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

import type { GestureResponderEvent } from 'react-native';
import { Pressable, Text, View } from 'react-native';
import { getAnalysisStatusOption } from '../constants/analysisStatus';
import type { AnalysisStatus } from '../types/analysis.types';
import { analysisStatusBadgeStyles as styles } from './styles/analysisStatusBadgeStyles';

type AnalysisStatusBadgeProps = {
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  status: AnalysisStatus;
  variant?: 'default' | 'large';
};

export const AnalysisStatusBadge = ({
  disabled = false,
  onPress,
  status,
  variant = 'default',
}: AnalysisStatusBadgeProps) => {
  const statusOption = getAnalysisStatusOption(status);
  const badgeStyle = [
    styles.badge,
    {
      backgroundColor: statusOption.backgroundColor,
      borderColor: statusOption.borderColor,
    },
    variant === 'large' && styles.largeBadge,
    onPress && styles.pressableBadge,
  ];

  const content = (
    <Text
      style={[
        styles.text,
        variant === 'large' && styles.largeText,
        { color: statusOption.textColor },
      ]}
    >
      {statusOption.label}
    </Text>
  );

  if (!onPress) {
    return <View style={badgeStyle}>{content}</View>;
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        ...badgeStyle,
        pressed && styles.badgePressed,
        disabled && styles.badgeDisabled,
      ]}
    >
      {content}
    </Pressable>
  );
};

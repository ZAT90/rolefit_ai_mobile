import {Pressable, Text, View} from 'react-native';
import {ScreenWrapper} from './ScreenWrapper';
import {placeholderStyles as styles} from './styles/placeholderStyles';

type PlaceholderScreenProps = {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
};

export const PlaceholderScreen = ({
  title,
  subtitle,
  showBackButton,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: PlaceholderScreenProps) => {
  return (
    <ScreenWrapper showBackButton={showBackButton}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>RoleFit AI</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {primaryActionLabel ? (
          <Pressable style={styles.primaryButton} onPress={onPrimaryAction}>
            <Text style={styles.primaryButtonText}>{primaryActionLabel}</Text>
          </Pressable>
        ) : null}

        {secondaryActionLabel ? (
          <Pressable style={styles.secondaryButton} onPress={onSecondaryAction}>
            <Text style={styles.secondaryButtonText}>
              {secondaryActionLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </ScreenWrapper>
  );
};

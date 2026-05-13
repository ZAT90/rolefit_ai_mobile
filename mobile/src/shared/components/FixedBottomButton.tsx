import { ActivityIndicator, Pressable, Text } from 'react-native';
import { fixedBottomButtonStyles as styles } from './styles/fixedBottomButtonStyles';

type FixedBottomButtonProps = {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const FixedBottomButton = ({
  label,
  isLoading = false,
  disabled = false,
  onPress,
}: FixedBottomButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        (pressed || isDisabled) && styles.buttonPressed,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#101820" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </Pressable>
  );
};

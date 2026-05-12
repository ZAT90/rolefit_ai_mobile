import {Pressable, Text, View} from 'react-native';
import {counterStyles as styles} from './styles/counterStyles';

type CounterInputProps = {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  errorMessage?: string;
  isRequired?: boolean;
};

export const CounterInput = ({
  label,
  value,
  onIncrement,
  onDecrement,
  errorMessage,
  isRequired,
}: CounterInputProps) => {
  const isDecrementDisabled = value <= 0;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.requirementText}>
          {isRequired ? 'Required' : 'Optional'}
        </Text>
      </View>
      <View style={[styles.control, errorMessage && styles.controlError]}>
        <Pressable
          disabled={isDecrementDisabled}
          onPress={onDecrement}
          style={({pressed}) => [
            styles.stepButton,
            isDecrementDisabled && styles.disabledButton,
            pressed && !isDecrementDisabled && styles.pressedButton,
          ]}>
          <Text style={styles.stepButtonText}>-</Text>
        </Pressable>

        <Text style={styles.value}>{value}</Text>

        <Pressable
          onPress={onIncrement}
          style={({pressed}) => [
            styles.stepButton,
            pressed && styles.pressedButton,
          ]}>
          <Text style={styles.stepButtonText}>+</Text>
        </Pressable>
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

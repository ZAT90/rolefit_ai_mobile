import {Text, TextInput, TextInputProps, View} from 'react-native';
import {textFieldStyles as styles} from './styles/textFieldStyles';

type TextFieldProps = TextInputProps & {
  label: string;
  errorMessage?: string;
  isRequired?: boolean;
};

export const TextField = ({
  label,
  style,
  errorMessage,
  isRequired,
  ...inputProps
}: TextFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.requirementText}>
          {isRequired ? 'Required' : 'Optional'}
        </Text>
      </View>
      <TextInput
        placeholderTextColor="#64748b"
        style={[styles.input, errorMessage && styles.inputError, style]}
        {...inputProps}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

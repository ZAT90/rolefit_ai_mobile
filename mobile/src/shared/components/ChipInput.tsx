import { useEffect, useReducer } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { CHIP_INPUT_ACTIONS } from '../state/chipInputActionTypes';
import {
  chipInputReducer,
  getItemsAfterRemove,
  getItemsAfterSubmit,
} from '../state/chipInputReducer';
import { chipStyles as styles } from './styles/chipStyles';

type ChipInputProps = {
  label: string;
  initialValue: string[];
  placeholder?: string;
  onChange?: (value: string[]) => void;
  errorMessage?: string;
  isRequired?: boolean;
};

export const ChipInput = ({
  label,
  initialValue,
  placeholder,
  onChange,
  errorMessage,
  isRequired,
}: ChipInputProps) => {
  const [{ draftValue, items }, dispatch] = useReducer(chipInputReducer, {
    draftValue: '',
    ignoredSubmittedValue: null,
    items: initialValue,
  });

  useEffect(() => {
    dispatch({ type: CHIP_INPUT_ACTIONS.SET_ITEMS, value: initialValue });
  }, [initialValue]);

  const submitDraftValue: NonNullable<
    TextInputProps['onSubmitEditing']
  > = event => {
    const submittedValue = event.nativeEvent.text || draftValue;
    const nextItems = getItemsAfterSubmit(items, submittedValue);

    dispatch({
      type: CHIP_INPUT_ACTIONS.SUBMIT_DRAFT,
      value: submittedValue,
    });

    if (nextItems !== items) {
      onChange?.(nextItems);
    }
  };

  const removeItem = (item: string) => {
    const nextItems = getItemsAfterRemove(items, item);

    dispatch({ type: CHIP_INPUT_ACTIONS.REMOVE_ITEM, value: item });
    onChange?.(nextItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.requirementText}>
          {isRequired ? 'Required' : 'Optional'}
        </Text>
      </View>
      <View style={[styles.field, errorMessage && styles.fieldError]}>
        <View style={styles.chipList}>
          {items.map(item => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
              <Pressable
                accessibilityLabel={`Remove ${item}`}
                hitSlop={8}
                onPress={() => removeItem(item)}
              >
                <Text style={styles.removeText}>x</Text>
              </Pressable>
            </View>
          ))}
        </View>
        <TextInput
          autoCapitalize="words"
          onChangeText={value =>
            dispatch({ type: CHIP_INPUT_ACTIONS.SET_DRAFT, value })
          }
          onSubmitEditing={submitDraftValue}
          placeholder={placeholder}
          placeholderTextColor="#64748b"
          returnKeyType="done"
          style={styles.input}
          value={draftValue}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

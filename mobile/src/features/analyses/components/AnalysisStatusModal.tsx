import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';
import { getVisibleAnalysisStatusOptions } from '../constants/analysisStatus';
import type { AnalysisStatus } from '../types/analysis.types';
import { analysisStatusModalStyles as styles } from './styles/analysisStatusModalStyles';

type AnalysisStatusModalProps = {
  currentStatus?: AnalysisStatus;
  isUpdating: boolean;
  onClose: () => void;
  onSelectStatus: (status: AnalysisStatus) => void;
  visible: boolean;
};

export const AnalysisStatusModal = ({
  currentStatus,
  isUpdating,
  onClose,
  onSelectStatus,
  visible,
}: AnalysisStatusModalProps) => {
  const visibleStatusOptions = getVisibleAnalysisStatusOptions(currentStatus);

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />
        <View style={styles.card}>
          <Text style={styles.title}>Update status</Text>
          <Text style={styles.subtitle}>
            Move this role through your application pipeline.
          </Text>

          <View style={styles.options}>
            {visibleStatusOptions.map(option => {
              const isSelected = option.value === currentStatus;

              return (
                <Pressable
                  disabled={isUpdating}
                  key={option.value}
                  onPress={() => onSelectStatus(option.value)}
                  style={({ pressed }) => [
                    styles.option,
                    pressed && styles.optionPressed,
                    isSelected && styles.optionSelected,
                  ]}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                  {isSelected ? (
                    <Text style={styles.selectedText}>Current</Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>

          {isUpdating ? (
            <View style={styles.updatingRow}>
              <ActivityIndicator color="#f8fafc" size="small" />
              <Text style={styles.updatingText}>Updating status</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

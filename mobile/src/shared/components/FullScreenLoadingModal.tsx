import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { fullScreenLoadingModalStyles as styles } from './styles/fullScreenLoadingModalStyles';

type FullScreenLoadingModalProps = {
  visible: boolean;
  title: string;
  message: string;
};

export const FullScreenLoadingModal = ({
  visible,
  title,
  message,
}: FullScreenLoadingModalProps) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator color="#f8fafc" size="large" />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

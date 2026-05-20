import { StyleSheet } from 'react-native';

export const fullScreenLoadingModalStyles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(10, 16, 24, 0.86)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#17212b',
    borderColor: '#334965',
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 26,
    width: '100%',
  },
  title: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '900',
  },
  message: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  content: {
    paddingBottom: 112,
    paddingTop: 18,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 10,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    gap: 18,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  summaryInput: {
    minHeight: 132,
  },
  apiErrorText: {
    color: '#fca5a5',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

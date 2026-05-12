import {StyleSheet} from 'react-native';

export const profileStyles = StyleSheet.create({
  content: {
    paddingBottom: 32,
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
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    minHeight: 54,
    justifyContent: 'center',
    marginTop: 6,
  },
  saveButtonPressed: {
    opacity: 0.75,
  },
  saveButtonText: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '800',
  },
  apiErrorText: {
    color: '#fca5a5',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

import { StyleSheet } from 'react-native';

export const newAnalysisStyles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 112,
    paddingTop: 18,
  },
  header: {
    marginBottom: 24,
  },
  eyebrow: {
    color: '#8fb8ff',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
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
  descriptionInput: {
    minHeight: 210,
    textAlignVertical: 'top',
  },
  characterCount: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
    marginTop: -10,
    textAlign: 'right',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 13,
    lineHeight: 19,
  },
});

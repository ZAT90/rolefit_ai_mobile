import {StyleSheet} from 'react-native';

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#8fb8ff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  form: {
    gap: 14,
  },
  input: {
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    color: '#f8fafc',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    minHeight: 52,
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  primaryButtonText: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#dbeafe',
    fontSize: 15,
    fontWeight: '700',
  },
});

import {StyleSheet} from 'react-native';

export const placeholderStyles = StyleSheet.create({
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
    lineHeight: 38,
    marginBottom: 16,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 28,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#dbeafe',
    fontSize: 15,
    fontWeight: '700',
  },
});

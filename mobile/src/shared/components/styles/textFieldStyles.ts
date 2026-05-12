import {StyleSheet} from 'react-native';

export const textFieldStyles = StyleSheet.create({
  container: {
    gap: 8,
  },
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    color: '#f8fafc',
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputError: {
    borderColor: '#fca5a5',
  },
  requirementText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 13,
    lineHeight: 18,
  },
});

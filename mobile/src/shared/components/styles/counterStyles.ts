import {StyleSheet} from 'react-native';

export const counterStyles = StyleSheet.create({
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
  control: {
    alignItems: 'center',
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  controlError: {
    borderColor: '#fca5a5',
  },
  stepButton: {
    alignItems: 'center',
    backgroundColor: '#263442',
    borderRadius: 8,
    height: 38,
    justifyContent: 'center',
    width: 44,
  },
  pressedButton: {
    opacity: 0.75,
  },
  disabledButton: {
    opacity: 0.35,
  },
  stepButtonText: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '800',
  },
  value: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '800',
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

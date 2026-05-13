import { StyleSheet } from 'react-native';

export const fixedBottomButtonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    bottom: 30,
    justifyContent: 'center',
    left: 15,
    minHeight: 54,
    position: 'absolute',
    right: 15,
    zIndex: 999,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '800',
  },
});

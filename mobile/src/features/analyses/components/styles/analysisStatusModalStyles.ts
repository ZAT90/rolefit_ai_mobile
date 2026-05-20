import { StyleSheet } from 'react-native';

export const analysisStatusModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(2, 6, 23, 0.72)',
  },
  card: {
    backgroundColor: '#101820',
    borderColor: '#26384a',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 1,
    paddingBottom: 34,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  title: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 18,
  },
  options: {
    gap: 10,
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 14,
  },
  optionPressed: {
    opacity: 0.78,
  },
  optionSelected: {
    backgroundColor: '#1d2c3d',
    borderColor: '#8fb8ff',
    borderWidth: 2,
  },
  optionText: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  selectedText: {
    color: '#8fb8ff',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  updatingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: 18,
  },
  updatingText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
  },
});

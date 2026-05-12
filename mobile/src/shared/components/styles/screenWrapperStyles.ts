import {StyleSheet} from 'react-native';

export const screenWrapperStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 36,
    minWidth: 72,
  },
  backIcon: {
    color: '#dbeafe',
    fontSize: 22,
    fontWeight: '700',
    marginRight: 6,
  },
  backText: {
    color: '#dbeafe',
    fontSize: 15,
    fontWeight: '700',
  },
  headerSpacer: {
    minWidth: 72,
  },
  headerAction: {
    alignItems: 'flex-end',
    minWidth: 72,
  },
  headerTitle: {
    color: '#f8fafc',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

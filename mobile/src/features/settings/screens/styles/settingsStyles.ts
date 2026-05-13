import {StyleSheet} from 'react-native';

export const settingsStyles = StyleSheet.create({
  content: {
    flex: 1,
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
  accountCard: {
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 18,
    padding: 18,
  },
  label: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  userName: {
    color: '#f8fafc',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 6,
  },
  userEmail: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
  },
  logoutButton: {
    alignItems: 'center',
    borderColor: '#7f1d1d',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 52,
    justifyContent: 'center',
  },
  logoutButtonPressed: {
    opacity: 0.75,
  },
  logoutButtonText: {
    color: '#fecaca',
    fontSize: 16,
    fontWeight: '800',
  },
});

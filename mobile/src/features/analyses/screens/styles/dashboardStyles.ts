import {StyleSheet} from 'react-native';

export const dashboardStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 18,
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: '#17212b',
    borderColor: '#334965',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  profileButtonPressed: {
    opacity: 0.75,
  },
  profileIconHead: {
    backgroundColor: '#dbeafe',
    borderRadius: 5,
    height: 10,
    marginBottom: 3,
    width: 10,
  },
  profileIconBody: {
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    height: 8,
    width: 18,
  },
  hero: {
    marginBottom: 22,
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
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  statBox: {
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 22,
    padding: 16,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    minHeight: 52,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#334965',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 52,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#dbeafe',
    fontSize: 16,
    fontWeight: '800',
  },
  buttonPressed: {
    opacity: 0.75,
  },
});

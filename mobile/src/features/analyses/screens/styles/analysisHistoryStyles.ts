import { StyleSheet } from 'react-native';

export const analysisHistoryStyles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  eyebrow: {
    color: '#8fb8ff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 31,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 10,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 22,
    paddingVertical: 15,
  },
  primaryButtonPressed: {
    opacity: 0.78,
  },
  primaryButtonText: {
    color: '#101820',
    fontSize: 16,
    fontWeight: '800',
  },
  listContent: {
    paddingBottom: 28,
  },
  analysisCard: {
    alignItems: 'center',
    backgroundColor: '#15212c',
    borderColor: '#26384a',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  deleteAction: {
    alignItems: 'center',
    backgroundColor: '#dc2626',
    borderRadius: 8,
    gap: 4,
    justifyContent: 'center',
    marginBottom: 12,
    marginLeft: 10,
    paddingHorizontal: 18,
    width: 92,
  },
  deleteActionPressed: {
    opacity: 0.82,
  },
  deleteActionText: {
    color: '#fef2f2',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  actionErrorText: {
    color: '#fca5a5',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  analysisCardPressed: {
    opacity: 0.82,
  },
  analysisInfo: {
    flex: 1,
    minWidth: 0,
  },
  jobTitle: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },
  roleSummary: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 10,
  },
  scoreBox: {
    alignItems: 'center',
    minWidth: 58,
  },
  scoreValue: {
    color: '#f8fafc',
    fontSize: 25,
    fontWeight: '900',
  },
  scoreLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  stateBox: {
    alignItems: 'center',
    backgroundColor: '#15212c',
    borderColor: '#26384a',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  stateTitle: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  stateText: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  retryButtonText: {
    color: '#dbeafe',
    fontSize: 14,
    fontWeight: '800',
  },
});

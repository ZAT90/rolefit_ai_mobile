import { StyleSheet } from 'react-native';

export const skillBarStyles = StyleSheet.create({
  skillRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  rankBadge: {
    alignItems: 'center',
    borderRadius: 8,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  rankText: {
    color: '#101820',
    fontSize: 14,
    fontWeight: '900',
  },
  skillContent: {
    flex: 1,
    minWidth: 0,
  },
  skillHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: {
    color: '#f8fafc',
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
  },
  skillCount: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  barTrack: {
    backgroundColor: '#0f1720',
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: 999,
    height: 10,
    minWidth: 8,
  },
});

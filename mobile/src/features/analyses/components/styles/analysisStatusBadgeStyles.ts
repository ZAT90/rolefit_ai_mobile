import { StyleSheet } from 'react-native';

export const analysisStatusBadgeStyles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  largeBadge: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  pressableBadge: {
    minHeight: 32,
    justifyContent: 'center',
  },
  badgePressed: {
    opacity: 0.78,
  },
  badgeDisabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  largeText: {
    fontSize: 13,
    fontWeight: '900',
  },
});

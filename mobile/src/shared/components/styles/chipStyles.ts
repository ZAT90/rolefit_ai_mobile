import { StyleSheet } from 'react-native';

export const chipStyles = StyleSheet.create({
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
  field: {
    backgroundColor: '#17212b',
    borderColor: '#263442',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  fieldError: {
    borderColor: '#fca5a5',
  },
  inactiveField: {
    minHeight: 58,
  },
  chipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: '#223246',
    borderColor: '#334965',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '700',
  },
  removeText: {
    color: '#bfdbfe',
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    color: '#f8fafc',
    fontSize: 16,
    minHeight: 40,
    paddingVertical: 8,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20,
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

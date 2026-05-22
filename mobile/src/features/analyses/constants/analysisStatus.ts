import type { AnalysisStatus } from '../types/analysis.types';

export type AnalysisStatusOption = {
  value: AnalysisStatus;
  label: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

export const analysisStatusOptions: AnalysisStatusOption[] = [
  {
    value: 'SAVED',
    label: 'Saved',
    backgroundColor: '#203247',
    borderColor: '#385679',
    textColor: '#dbeafe',
  },
  {
    value: 'APPLIED',
    label: 'Applied',
    backgroundColor: '#164e63',
    borderColor: '#0e7490',
    textColor: '#cffafe',
  },
  {
    value: 'INTERVIEWING',
    label: 'Interviewing',
    backgroundColor: '#4c1d95',
    borderColor: '#7c3aed',
    textColor: '#ede9fe',
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
    backgroundColor: '#7f1d1d',
    borderColor: '#dc2626',
    textColor: '#fee2e2',
  },
  {
    value: 'OFFER',
    label: 'Offer',
    backgroundColor: '#14532d',
    borderColor: '#16a34a',
    textColor: '#dcfce7',
  },
  {
    value: 'GHOSTED',
    label: 'Ghosted',
    backgroundColor: '#334155',
    borderColor: '#64748b',
    textColor: '#e2e8f0',
  },
];

export const allowedStatusTransitions: Record<
  AnalysisStatus,
  AnalysisStatus[]
> = {
  SAVED: ['APPLIED', 'INTERVIEWING', 'REJECTED', 'OFFER', 'GHOSTED'],
  APPLIED: ['INTERVIEWING', 'REJECTED', 'OFFER', 'GHOSTED'],
  INTERVIEWING: ['REJECTED', 'OFFER', 'GHOSTED'],
  REJECTED: [],
  OFFER: [],
  GHOSTED: [],
};

export const getAnalysisStatusOption = (status: AnalysisStatus) => {
  return (
    analysisStatusOptions.find(option => option.value === status) ??
    analysisStatusOptions[0]
  );
};

export const getVisibleAnalysisStatusOptions = (status?: AnalysisStatus) => {
  if (!status) {
    return analysisStatusOptions;
  }

  const visibleStatusValues = [status, ...allowedStatusTransitions[status]];

  return analysisStatusOptions.filter(option =>
    visibleStatusValues.includes(option.value),
  );
};

export const isFinalAnalysisStatus = (status?: AnalysisStatus) => {
  if (!status) {
    return false;
  }

  return allowedStatusTransitions[status].length === 0;
};

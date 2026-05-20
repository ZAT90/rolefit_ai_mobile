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
];

export const getAnalysisStatusOption = (status: AnalysisStatus) => {
  return (
    analysisStatusOptions.find(option => option.value === status) ??
    analysisStatusOptions[0]
  );
};

export type AnalysisStatus =
  | 'SAVED'
  | 'APPLIED'
  | 'INTERVIEWING'
  | 'REJECTED'
  | 'OFFER';

export type JobAnalysis = {
  id: string;
  userId: string;
  jobTitle: string;
  companyName: string | null;
  jobUrl: string | null;
  jobDescription: string;
  fitScore: number | null;
  roleSummary: string | null;
  seniorityLevel: string | null;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  senioritySignals: string[];
  interviewQuestions: string[];
  outreachMessage: string | null;
  resumeAdvice: string | null;
  nextActions: string[];
  rawAiResponse: unknown;
  status: AnalysisStatus;
  createdAt: string;
  updatedAt: string;
};

export type AnalysesResponse = {
  analyses: JobAnalysis[];
};

export type AnalysisResponse = {
  analysis: JobAnalysis;
};

export type CreateAnalysisPayload = {
  jobTitle: string;
  companyName?: string;
  jobUrl?: string;
  jobDescription: string;
};

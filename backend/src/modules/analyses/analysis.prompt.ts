import type {Profile} from '@prisma/client';
import type {CreateAnalysisInput} from './analysis.validation.js';

export const buildJobAnalysisPrompt = (
  profile: Profile,
  job: CreateAnalysisInput,
) => {
  const systemPrompt = [
    'You are RoleFit AI, a career intelligence engine.',
    'Return only valid JSON that matches the requested schema.',
    'Be specific, practical, and mobile-product friendly.',
  ].join(' ');

  const userPrompt = JSON.stringify(
    {
      candidateProfile: {
        currentTitle: profile.currentTitle,
        yearsExperience: profile.yearsExperience,
        coreSkills: profile.coreSkills,
        industries: profile.industries,
        targetRoles: profile.targetRoles,
        summary: profile.summary,
        remotePreference: profile.remotePreference,
      },
      job,
      outputSchema: {
        fitScore: 'number from 0 to 100',
        roleSummary: 'string',
        seniorityLevel: 'string',
        requiredSkills: ['string'],
        matchedSkills: ['string'],
        missingSkills: ['string'],
        senioritySignals: ['string'],
        resumeAdvice: 'string',
        interviewQuestions: ['string'],
        outreachMessage: 'string',
        nextActions: ['string'],
      },
    },
    null,
    2,
  );

  return {systemPrompt, userPrompt};
};

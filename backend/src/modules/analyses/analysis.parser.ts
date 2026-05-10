import {z} from 'zod';

export const analysisResponseSchema = z.object({
  fitScore: z.number().int().min(0).max(100),
  roleSummary: z.string().min(1),
  seniorityLevel: z.string().min(1),
  requiredSkills: z.array(z.string()).default([]),
  matchedSkills: z.array(z.string()).default([]),
  missingSkills: z.array(z.string()).default([]),
  senioritySignals: z.array(z.string()).default([]),
  resumeAdvice: z.string().min(1),
  interviewQuestions: z.array(z.string()).default([]),
  outreachMessage: z.string().min(1),
  nextActions: z.array(z.string()).default([]),
});

export type ParsedAnalysisResponse = z.infer<typeof analysisResponseSchema>;

export function parseAnalysisResponse(response: unknown): ParsedAnalysisResponse {
  if (typeof response === 'string') {
    return analysisResponseSchema.parse(JSON.parse(response));
  }

  return analysisResponseSchema.parse(response);
}

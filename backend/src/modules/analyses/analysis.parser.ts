import { z } from "zod";
import { ApiError } from "../../utils/ApiError";

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

export const parseAnalysisResponse = (
  rawAiResponse: string,
): ParsedAnalysisResponse => {
  try {
    const json = JSON.parse(rawAiResponse);
    return analysisResponseSchema.parse(json);
  } catch (error) {
    throw new ApiError(
      502,
      "AI returned an invalid analysis response. Please try again.",
    );
  }
};

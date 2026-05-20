import { z } from "zod";
import { ApiError } from "../../utils/ApiError";
import { logger } from "../../utils/logger";

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

const getJsonText = (rawAiResponse: string) => {
  const trimmedResponse = rawAiResponse.trim();
  const withoutFence = trimmedResponse
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  if (withoutFence.startsWith("{") && withoutFence.endsWith("}")) {
    return withoutFence;
  }

  const firstBraceIndex = withoutFence.indexOf("{");
  const lastBraceIndex = withoutFence.lastIndexOf("}");

  if (firstBraceIndex === -1 || lastBraceIndex === -1) {
    return withoutFence;
  }

  return withoutFence.slice(firstBraceIndex, lastBraceIndex + 1);
};

export const parseAnalysisResponse = (
  rawAiResponse: string,
): ParsedAnalysisResponse => {
  try {
    const json = JSON.parse(getJsonText(rawAiResponse));
    return analysisResponseSchema.parse(json);
  } catch (error) {
    logger.error("Invalid AI analysis response", {
      error,
      rawAiResponse,
    });

    throw new ApiError(
      502,
      "AI returned an invalid analysis response. Please try again.",
    );
  }
};

import type { Profile } from "@prisma/client";
import type { CreateAnalysisInput } from "./analysis.validation.js";

export const buildJobAnalysisPrompt = (
  profile: Profile,
  job: CreateAnalysisInput,
) => {
  const systemPrompt = [
    "You are RoleFit AI, a career intelligence engine for senior job seekers.",
    "Compare the candidate profile against the job description and produce structured role-fit analysis.",
    "Return valid JSON only.",
    "Do not include markdown, code fences, commentary, or explanation.",
    "The JSON must match the requested schema exactly.",
    "fitScore must be an integer from 0 to 100.",
    "All array fields must contain strings only.",
    "If evidence is weak, use concise conservative language instead of inventing facts.",
    "Write for a mobile product UI: concise, specific, and actionable.",
  ].join(" ");

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
        fitScore: "integer from 0 to 100",
        roleSummary: "string",
        seniorityLevel: "string",
        requiredSkills: ["string"],
        matchedSkills: ["string"],
        missingSkills: ["string"],
        senioritySignals: ["string"],
        resumeAdvice: "string",
        interviewQuestions: ["string"],
        outreachMessage: "string",
        nextActions: ["string"],
      },
    },
    null,
    2,
  );

  return { systemPrompt, userPrompt };
};

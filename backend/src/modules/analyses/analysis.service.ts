import type { AnalysisStatus } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/ApiError.js";
import { getAiProvider } from "../ai/aiProvider.js";
import { getProfileByUserId } from "../profiles/profile.service.js";
import { parseAnalysisResponse } from "./analysis.parser.js";
import { buildJobAnalysisPrompt } from "./analysis.prompt.js";
import type { CreateAnalysisInput } from "./analysis.validation.js";

const allowedStatusTransitions: Record<AnalysisStatus, AnalysisStatus[]> = {
  SAVED: ["APPLIED", "INTERVIEWING", "REJECTED", "OFFER", "GHOSTED"],
  APPLIED: ["INTERVIEWING", "REJECTED", "OFFER", "GHOSTED"],
  INTERVIEWING: ["REJECTED", "OFFER", "GHOSTED"],
  REJECTED: [],
  OFFER: [],
  GHOSTED: [],
};

export const createAnalysis = async (
  userId: string,
  input: CreateAnalysisInput,
) => {
  const profile = await getProfileByUserId(userId);
  const prompt = buildJobAnalysisPrompt(profile, input);
  const rawAiResponse = await getAiProvider().generateText(prompt);
  const parsed = parseAnalysisResponse(rawAiResponse);

  return prisma.jobAnalysis.create({
    data: {
      userId,
      ...input,
      ...parsed,
      rawAiResponse: {
        rawText: rawAiResponse,
      },
    },
  });
};

export const listAnalyses = (userId: string) => {
  return prisma.jobAnalysis.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getAnalysis = async (userId: string, id: string) => {
  const analysis = await prisma.jobAnalysis.findFirst({
    where: { id, userId },
  });

  if (!analysis) {
    throw new ApiError(404, "Analysis not found");
  }

  return analysis;
};

export const deleteAnalysis = async (userId: string, id: string) => {
  await getAnalysis(userId, id);
  await prisma.jobAnalysis.delete({ where: { id } });
};

export const updateAnalysisStatus = async (
  userId: string,
  id: string,
  status: AnalysisStatus,
) => {
  const analysis = await getAnalysis(userId, id);
  const allowedNextStatuses = allowedStatusTransitions[analysis.status];
  if (!allowedNextStatuses.includes(status)) {
    throw new ApiError(400, "Invalid analysis status transition");
  }
  return prisma.jobAnalysis.update({ where: { id }, data: { status } });
};

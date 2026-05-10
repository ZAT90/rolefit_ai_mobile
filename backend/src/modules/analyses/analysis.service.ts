import type {AnalysisStatus} from '@prisma/client';
import {prisma} from '../../config/prisma.js';
import {ApiError} from '../../utils/ApiError.js';
import {getAiProvider} from '../ai/aiProvider.js';
import {getProfileByUserId} from '../profiles/profile.service.js';
import {parseAnalysisResponse} from './analysis.parser.js';
import {buildJobAnalysisPrompt} from './analysis.prompt.js';
import type {CreateAnalysisInput} from './analysis.validation.js';

export async function createAnalysis(userId: string, input: CreateAnalysisInput) {
  const profile = await getProfileByUserId(userId);
  const prompt = buildJobAnalysisPrompt(profile, input);
  const rawAiResponse = await getAiProvider().generateStructuredOutput(prompt);
  const parsed = parseAnalysisResponse(rawAiResponse);

  return prisma.jobAnalysis.create({
    data: {
      userId,
      ...input,
      ...parsed,
      rawAiResponse: rawAiResponse as object,
    },
  });
}

export function listAnalyses(userId: string) {
  return prisma.jobAnalysis.findMany({
    where: {userId},
    orderBy: {createdAt: 'desc'},
  });
}

export async function getAnalysis(userId: string, id: string) {
  const analysis = await prisma.jobAnalysis.findFirst({where: {id, userId}});

  if (!analysis) {
    throw new ApiError(404, 'Analysis not found');
  }

  return analysis;
}

export async function deleteAnalysis(userId: string, id: string) {
  await getAnalysis(userId, id);
  await prisma.jobAnalysis.delete({where: {id}});
}

export async function updateAnalysisStatus(
  userId: string,
  id: string,
  status: AnalysisStatus,
) {
  await getAnalysis(userId, id);
  return prisma.jobAnalysis.update({where: {id}, data: {status}});
}

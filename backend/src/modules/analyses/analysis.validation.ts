import {AnalysisStatus} from '@prisma/client';
import {z} from 'zod';

export const createAnalysisSchema = z.object({
  body: z.object({
    jobTitle: z.string().min(2),
    companyName: z.string().optional(),
    jobUrl: z.string().url().optional(),
    jobDescription: z.string().min(80),
  }),
});

export const analysisIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateAnalysisStatusSchema = analysisIdSchema.extend({
  body: z.object({
    status: z.nativeEnum(AnalysisStatus),
  }),
});

export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>['body'];

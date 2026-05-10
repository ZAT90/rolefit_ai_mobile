import {z} from 'zod';

const profileBodySchema = z.object({
  currentTitle: z.string().min(2),
  yearsExperience: z.number().int().min(0).max(60).optional(),
  coreSkills: z.array(z.string().min(1)).default([]),
  industries: z.array(z.string().min(1)).default([]),
  targetRoles: z.array(z.string().min(1)).default([]),
  summary: z.string().min(20),
  remotePreference: z.string().optional(),
});

export const upsertProfileSchema = z.object({
  body: profileBodySchema,
});

export type UpsertProfileInput = z.infer<typeof profileBodySchema>;

import {prisma} from '../../config/prisma.js';
import {ApiError} from '../../utils/ApiError.js';
import type {UpsertProfileInput} from './profile.validation.js';

export const getProfileByUserId = async (userId: string) => {
  const profile = await prisma.profile.findUnique({where: {userId}});

  if (!profile) {
    throw new ApiError(404, 'Candidate profile not found');
  }

  return profile;
};

export const upsertProfile = async (
  userId: string,
  input: UpsertProfileInput,
) => {
  return prisma.profile.upsert({
    where: {userId},
    create: {...input, userId},
    update: input,
  });
};

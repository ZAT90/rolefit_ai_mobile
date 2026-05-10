import {prisma} from '../../config/prisma.js';
import {ApiError} from '../../utils/ApiError.js';

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    select: {id: true, name: true, email: true, createdAt: true, updatedAt: true},
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
}

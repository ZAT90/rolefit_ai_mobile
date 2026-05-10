import type {AuthenticatedRequest} from '../../middleware/authMiddleware.js';
import {asyncHandler} from '../../utils/asyncHandler.js';
import {getUserById} from './user.service.js';

export const getCurrentUser = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const user = await getUserById(authReq.user.userId);
  res.json({user});
});

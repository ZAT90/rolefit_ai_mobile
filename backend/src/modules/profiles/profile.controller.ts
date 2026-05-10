import type {AuthenticatedRequest} from '../../middleware/authMiddleware.js';
import {asyncHandler} from '../../utils/asyncHandler.js';
import {getProfileByUserId, upsertProfile} from './profile.service.js';

export const createProfile = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const profile = await upsertProfile(authReq.user.userId, req.body);
  res.status(201).json({profile});
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const profile = await getProfileByUserId(authReq.user.userId);
  res.json({profile});
});

export const updateMyProfile = asyncHandler(async (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const profile = await upsertProfile(authReq.user.userId, req.body);
  res.json({profile});
});

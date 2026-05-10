import type {Response} from 'express';
import type {AuthenticatedRequest} from '../../middleware/authMiddleware.js';
import {asyncHandler} from '../../utils/asyncHandler.js';
import {getUserById} from '../users/user.service.js';
import {loginUser, registerUser} from './auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);
  res.json(result);
});

export const me = asyncHandler(async (req, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const user = await getUserById(authReq.user.userId);
  res.json({user});
});

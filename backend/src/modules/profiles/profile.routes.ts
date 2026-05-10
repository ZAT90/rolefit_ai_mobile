import {Router} from 'express';
import {authMiddleware} from '../../middleware/authMiddleware.js';
import {validateRequest} from '../../middleware/validateRequest.js';
import {
  createProfile,
  getMyProfile,
  updateMyProfile,
} from './profile.controller.js';
import {upsertProfileSchema} from './profile.validation.js';

export const profileRoutes = Router();

profileRoutes.use(authMiddleware);
profileRoutes.post('/', validateRequest(upsertProfileSchema), createProfile);
profileRoutes.get('/me', getMyProfile);
profileRoutes.put('/me', validateRequest(upsertProfileSchema), updateMyProfile);

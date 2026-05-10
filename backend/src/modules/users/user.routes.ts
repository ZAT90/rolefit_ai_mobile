import {Router} from 'express';
import {authMiddleware} from '../../middleware/authMiddleware.js';
import {getCurrentUser} from './user.controller.js';

export const userRoutes = Router();

userRoutes.get('/me', authMiddleware, getCurrentUser);

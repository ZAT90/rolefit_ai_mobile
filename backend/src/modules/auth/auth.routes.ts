import {Router} from 'express';
import {authMiddleware} from '../../middleware/authMiddleware.js';
import {validateRequest} from '../../middleware/validateRequest.js';
import {login, me, register} from './auth.controller.js';
import {loginSchema, registerSchema} from './auth.validation.js';

export const authRoutes = Router();

authRoutes.post('/register', validateRequest(registerSchema), register);
authRoutes.post('/login', validateRequest(loginSchema), login);
authRoutes.get('/me', authMiddleware, me);

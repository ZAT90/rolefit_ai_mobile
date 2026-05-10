import type {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';
import {ApiError} from '../utils/ApiError.js';

type JwtPayload = {
  userId: string;
};

export type AuthenticatedRequest = Request & {
  user: JwtPayload;
};

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : undefined;

  if (!token) {
    throw new ApiError(401, 'Authentication token is required');
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    (req as AuthenticatedRequest).user = {userId: payload.userId};
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
};

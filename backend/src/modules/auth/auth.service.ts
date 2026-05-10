import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type {SignOptions} from 'jsonwebtoken';
import {env} from '../../config/env.js';
import {prisma} from '../../config/prisma.js';
import {ApiError} from '../../utils/ApiError.js';
import type {LoginInput, RegisterInput} from './auth.validation.js';

const SALT_ROUNDS = 12;

const signToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  return jwt.sign({userId}, env.JWT_SECRET, options);
};

export const registerUser = async (input: RegisterInput) => {
  const email = input.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({where: {email}});

  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {name: input.name, email, passwordHash},
    select: {id: true, name: true, email: true, createdAt: true},
  });

  return {user, token: signToken(user.id)};
};

export const loginUser = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {email: input.email.toLowerCase()},
  });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token: signToken(user.id),
  };
};

import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { COOKIE_EXPIRY_15_DAYS } from '../constants/constants.js';

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    maxAge: COOKIE_EXPIRY_15_DAYS,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return token;
};

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.js';
import ServerError from '../errors/serverError.js';

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ServerError(
      StatusCodes.UNAUTHORIZED,
      'Unauthorized - No token provided'
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
try {
  if (!decoded) {
    throw new ServerError(
      StatusCodes.UNAUTHORIZED,
      'Unauthorized - Invalid Token'
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, username: true, fullName: true, profilePic: true },
  });

  if (!user) {
    throw new ServerError(StatusCodes.NOT_FOUND, 'User not found');
  }

  req.user = user;

  next();

  } catch (error: any) {
    console.log('Error in protectRoute middleware', error.message);
    throw new ServerError(StatusCodes.UNAUTHORIZED, error.message);
  }
};

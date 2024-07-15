import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../utils/generateToken.js';
import ServerError from '../errors/serverError.js';
import { validationResult } from 'express-validator';
import { authService } from '../services/auth.service.js';

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((error) => error.msg)
        .join(', ');
      throw new ServerError(StatusCodes.BAD_REQUEST, message);
    }

    const newUser = await authService.signup(req.body);
    generateToken(newUser.id, res);
    res.status(StatusCodes.CREATED).json(newUser);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const user = await authService.login(req.body);

    generateToken(user.id, res);
    res.status(StatusCodes.OK).json(user);
  }

  async logout(req: Request, res: Response) {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
  }

  async getMe(req: Request, res: Response) {
    const me = await authService.getMe(req.user.id);
    res.status(StatusCodes.OK).json(me);
  }
}

export const authController = new AuthController();

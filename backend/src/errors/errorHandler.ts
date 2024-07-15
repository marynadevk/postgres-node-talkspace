import { NextFunction, Request, Response } from 'express';

export const errorHandler = (controller: (req: Request, res: Response, next: NextFunction) => {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

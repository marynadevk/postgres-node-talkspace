import { Request, Response } from 'express';

class AuthController {
  async login(req: Request, res: Response) {
    await res.send('Login route');
  }

  async signup(req: Request, res: Response) {
    // code here
  }

  async logout(req: Request, res: Response) {
    // code here
  }
}

export const authController = new AuthController();

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.js';
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';


class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { username, fullName, password, confirmPassword, gender } = req.body;

      if (!fullName || !username || !password || !confirmPassword || !gender) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please fill in all fields" });
      }
  
      if (password !== confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Passwords don't match" });
      }
  
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Username already exists" });
      }

      const salt = await bcryptjs.genSalt(10);
		  const hashedPassword = await bcryptjs.hash(password, salt);
      const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
      const newUser = await prisma.user.create({
        data: {
          fullName,
          username,
          password: hashedPassword,
          gender,
          profilePic: gender === 'male' ? maleProfilePic : femaleProfilePic,
        },
      });
  
      if (newUser) {
        generateToken(newUser.id, res);
  
        res.status(StatusCodes.CREATED).json({
          id: newUser.id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user data" });
      }
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid credentials" });
      }
  
      generateToken(user.id, res);
  
      res.status(StatusCodes.CREATED).json({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.cookie('jwt', '', { maxAge: 0 });
      res.status(StatusCodes.CREATED).json({ message: "Logged out successfully" });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
      }
  
      res.status(StatusCodes.OK).json({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
  }
}

export const authController = new AuthController();

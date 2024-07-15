import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.js';
import  bcrypt from 'bcrypt';
import { ISignupData } from '../interfaces/ISignupData';
import { ILoginData } from '../interfaces/ILoginData.js';
import ServerError from '../errors/serverError.js';

class AuthService {
  async signup(userData: ISignupData) {
    const { username, fullName, password, gender } = userData;
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      throw new ServerError(StatusCodes.BAD_REQUEST, "Username already exists" );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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

    return {
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    };
  };

  async login(userData: ILoginData) {
    const { username, password } = userData;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new ServerError(StatusCodes.BAD_REQUEST, "Invalid credentials" );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ServerError(StatusCodes.BAD_REQUEST, "Invalid credentials" );
    }
    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
  
    if (!user) {
      throw new ServerError(StatusCodes.NOT_FOUND, "User not found");
    }

    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    };
  }
}

export const authService = new AuthService();

import { Gender } from '@prisma/client';

export interface ISignupData {
  fullName: string;
  username: string;
  password: string;
  gender: Gender;
}
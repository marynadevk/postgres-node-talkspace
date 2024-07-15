import { body } from 'express-validator';

export const signUpValidator = [
  body('username', 'username is required').trim().notEmpty(),
  body('fullName', 'full name is required').trim().notEmpty(),
  body('password', 'password is required').trim().notEmpty(),
  body('gender', 'gender is required').trim().notEmpty()
];
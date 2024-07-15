import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { signUpValidator } from '../middleware/validators/signup.validator.js';
import { errorHandler } from '../errors/errorHandler.js';

const router = express.Router();

router.get('/me', authMiddleware, errorHandler(authController.getMe));
router.post('/signup', signUpValidator, errorHandler(authController.signup));
router.post('/login', errorHandler(authController.login));
router.post('/logout', errorHandler(authController.logout));

export default router;

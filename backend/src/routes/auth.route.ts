import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { signUpValidator } from '../middleware/validators/signup.validator.js';
import { errorHandler } from '../errors/errorHandler.js';

const router = express.Router();

router.get('/me', protectRoute, errorHandler(authController.getMe));
router.post('/signup', signUpValidator, errorHandler(authController.signup));
router.post('/login', errorHandler(authController.login));
router.post('/logout', errorHandler(authController.logout));


export default router;

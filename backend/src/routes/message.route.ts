import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { messageController } from '../controllers/message.controller.js';
import { errorHandler } from '../errors/errorHandler.js';

const router = express.Router();

router.get('/conversations', authMiddleware, errorHandler(messageController.getUsersForSidebar));
router.get('/:id', authMiddleware, errorHandler(messageController.getMessages));
router.post('/send/:id', authMiddleware, errorHandler(messageController.sendMessage));

export default router;
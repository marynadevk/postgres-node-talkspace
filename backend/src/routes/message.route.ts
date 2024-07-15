import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { messageController } from '../controllers/message.controller.js';
import { errorHandler } from '../errors/errorHandler.js';

const router = express.Router();

router.get('/conversations', protectRoute, errorHandler(messageController.getUsersForSidebar));
router.get('/:id', protectRoute, errorHandler(messageController.getMessages));
router.post('/send/:id', protectRoute, errorHandler(messageController.sendMessage));

export default router;
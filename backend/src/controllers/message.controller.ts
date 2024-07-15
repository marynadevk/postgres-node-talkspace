import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { messageService } from '../services/message.service.js';

class MessageController {
  async sendMessage(req: Request, res: Response) {
    const { id: receiverId } = req.params;
    const data = { ...req.body, receiverId, senderId: req.user.id };
    const newMessage = await messageService.sendMessage(data);

    res.status(StatusCodes.CREATED).json(newMessage);
  }

  async getMessages(req: Request, res: Response) {
    const data = { userToChatId: req.params.id, senderId: req.user.id };
    const conversation = await messageService.getMessages(data);
    if (!conversation) {
      return res.status(StatusCodes.CREATED).json([]);
    }

    res.status(StatusCodes.OK).json(conversation.messages);
  }

  async getUsersForSidebar(req: Request, res: Response) {
    const authUserId = req.user.id;

    const users = await messageService.getUsersForSidebar(authUserId);

    res.status(StatusCodes.OK).json(users);
  }
}

export const messageController = new MessageController();

import { prisma } from '../db/prisma.js';
import { ISendMessageData } from '../interfaces/ISendMessageData';
import { IGetMessagesData } from '../interfaces/IGetMessagesData';
import { getReceiverSocketId, io } from '../socket/socket.js';

class MessageService {
  async sendMessage(data: ISendMessageData) {
    const { message, receiverId, senderId } = data;
    let conversation = await prisma.conversation.findFirst({
      where: { participantsIds: { hasEvery: [senderId, receiverId] } },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { participantsIds: { set: [senderId, receiverId] } },
      });
    }

    const newMessage = await prisma.message.create({
      data: { senderId, body: message, conversationId: conversation.id },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: { id: conversation.id },
        data: { messages: { connect: { id: newMessage.id } } },
      });
    }
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    return newMessage;
  }

  async getMessages(data: IGetMessagesData) {
    const { userToChatId, senderId } = data;
    return await prisma.conversation.findFirst({
      where: { participantsIds: { hasEvery: [senderId, userToChatId] }},
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
  }

  async getUsersForSidebar(authUserId: string) {
    return await prisma.user.findMany({
      where: { id: { not: authUserId } },
      select: { id: true, fullName: true, profilePic: true },
    });
  }
}

export const messageService = new MessageService();
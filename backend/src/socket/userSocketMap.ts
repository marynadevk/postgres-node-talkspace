import { Socket } from 'socket.io';
import { io } from './socket.js';

export const userSocketMap: { [key: string]: string } = {};
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

export const handleUserConnection = (socket: Socket): void => {
  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));
};

export const handleUserDisconnection = (socket: Socket): void => {
  const userId = socket.handshake.query.userId as string;
  if (userId) delete userSocketMap[userId];

  io.emit('getOnlineUsers', Object.keys(userSocketMap));
};

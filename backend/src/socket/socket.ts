import { Server } from 'socket.io';
import { socketServer } from './server.js';
import { handleUserConnection, handleUserDisconnection } from './userSocketMap.js';

export const io = new Server(socketServer, {
  cors: {
    origin: [process.env.WEBSOCKET_CORS_ORIGIN!],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  handleUserConnection(socket);

  socket.on('disconnect', () => {
    handleUserDisconnection(socket);
  });
});

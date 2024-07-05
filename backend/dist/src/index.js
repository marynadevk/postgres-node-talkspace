import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import { server, app } from './socket/socket.js';
import dotenv from 'dotenv';
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
server.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:', process.env.PORT);
});

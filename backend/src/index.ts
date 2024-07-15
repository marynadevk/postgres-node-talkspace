import'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import { socketServer, app } from './socket/server.js';
import ServerError from './errors/serverError.js';
import path from 'path';

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status).json({ error: err.message });
});

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

socketServer.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:', process.env.PORT);
});

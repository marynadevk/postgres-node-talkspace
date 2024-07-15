import http from 'http';
import express from 'express';

export const app = express();

export const socketServer = http.createServer(app);

import http from 'http';

import socketIo from 'socket.io';
import express, { Request, Response, NextFunction, Application } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import AppError from './errors/AppError';
import makeSocketIOAvailableInRequest from './middlewares/makeSocketIOAvailableInRequest';

const app = express();

export const server = http.createServer(app);
export const io = socketIo(server);

app.use(makeSocketIOAvailableInRequest(io));
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

interface IApp {
  app: Application;
  io: socketIo.Server;
  server: http.Server;
}

export default app;

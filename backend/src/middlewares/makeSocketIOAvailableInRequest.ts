import { Server } from 'socket.io';
import { Request, Response, NextFunction } from 'express';

const makeSocketIOAvailableInRequest = (socketIO: Server) => (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  request.socketIO = socketIO;

  next();
};

export default makeSocketIOAvailableInRequest;

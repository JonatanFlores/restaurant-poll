declare namespace Express {
  export interface Request {
    socketIO: import('socket.io').Server;
    user: {
      id: string;
    };
  }
}

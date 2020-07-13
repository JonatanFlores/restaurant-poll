import http from 'http';
import socketIo from 'socket.io';

import app from './app';
import sockets from './sockets';

const port = process.env.PORT || 3333;
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', sockets);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

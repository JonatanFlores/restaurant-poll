import { server, io } from './app';
import sockets from './sockets';

const port = process.env.PORT || 3333;

io.on('connection', sockets);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

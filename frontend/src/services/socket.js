import socketIO from 'socket.io-client';

const socket = socketIO(process.env.REACT_APP_API_URL);

export default socket;
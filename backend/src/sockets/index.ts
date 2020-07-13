import { Server } from 'socket.io';

import RestaurantSocket from './RestaurantsSocket';

export default (socket: Server): void => {
  const restaurantSocket = new RestaurantSocket(socket);

  restaurantSocket.execute();
};

import { Server } from 'socket.io';

import GenerateListOfRestaurantsToVoteService from '../services/GenerateListOfRestaurantsToVoteService';

class RestaurantSocket {
  private socket: Server;

  constructor(socket: Server) {
    this.socket = socket;
  }

  execute(): void {
    this.socket.on('new-vote-computed', this.list.bind(this));
  }

  async list(): Promise<void> {
    const generateListOfRestaurantsToVote = new GenerateListOfRestaurantsToVoteService();
    const restaurants = await generateListOfRestaurantsToVote.execute();

    this.socket.emit('update-restaurants-list', restaurants);
  }
}

export default RestaurantSocket;

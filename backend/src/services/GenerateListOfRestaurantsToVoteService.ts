import { startOfHour } from 'date-fns';

import RestaurantsRepository from '../repositories/RestaurantsRepository';
import PollsRepository from '../repositories/PollsRepository';
import CheckWinnersOfTheWeekService from './CheckWinnersOfTheWeekService';

interface Response {
  id: string;
  name: string;
  has_won: boolean;
}

class GenerateListOfRestaurantsToVote {
  public async execute(): Promise<Array<Response>> {
    const restaurantsRepository = new RestaurantsRepository();
    const pollsRepository = new PollsRepository();
    const checkWinnersOfTheWeek = new CheckWinnersOfTheWeekService();

    const restaurants = await restaurantsRepository.find();
    const date = startOfHour(new Date());
    const polls = await pollsRepository.find();
    const winners = checkWinnersOfTheWeek.execute({ polls, date });
    const restaurantsWithStatusOfWinners: Array<Response> = [];

    restaurants.forEach(restaurant => {
      const winner = winners.find(w => w.restaurant_id === restaurant.id);
      const restaurantTMP = {
        ...restaurant,
        has_won: false,
      };

      if (winner) {
        restaurantTMP.has_won = true;
      }

      restaurantsWithStatusOfWinners.push(restaurantTMP);
    });

    return restaurantsWithStatusOfWinners;
  }
}

export default GenerateListOfRestaurantsToVote;

import { startOfHour } from 'date-fns';

import RestaurantsRepository from '../repositories/RestaurantsRepository';
import PollsRepository from '../repositories/PollsRepository';
import CheckWinnersOfTheWeekService from './CheckWinnersOfTheWeekService';
import CheckVotesOfTodayService from './CheckVotesOfTodayService';

interface Response {
  id: string;
  name: string;
  has_won: boolean;
  votes: number;
}

class GenerateListOfRestaurantsToVote {
  public async execute(): Promise<Array<Response>> {
    const restaurantsRepository = new RestaurantsRepository();
    const pollsRepository = new PollsRepository();
    const checkWinnersOfTheWeek = new CheckWinnersOfTheWeekService();
    const checkVotesOfToday = new CheckVotesOfTodayService();

    const restaurants = await restaurantsRepository.find();
    const date = startOfHour(new Date());
    const polls = await pollsRepository.find();
    const winners = checkWinnersOfTheWeek.execute({ polls, date });
    const restaurantsWithStatusOfWinners: Array<Response> = [];
    const votes = await checkVotesOfToday.execute({ polls, date });

    restaurants.forEach(restaurant => {
      const winner = winners.find(w => w.restaurant_id === restaurant.id);
      const restaurantTMP = {
        ...restaurant,
        has_won: false,
        votes: votes[restaurant.id] || 0,
      };

      if (winner) {
        restaurantTMP.has_won = true;
      }

      restaurantsWithStatusOfWinners.push(restaurantTMP);
    });

    return restaurantsWithStatusOfWinners
      .sort((a, b) => a.votes - b.votes)
      .reverse();
  }
}

export default GenerateListOfRestaurantsToVote;

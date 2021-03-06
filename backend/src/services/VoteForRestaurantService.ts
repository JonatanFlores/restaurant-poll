import { startOfDay, isSameDay, compareAsc } from 'date-fns';

import PollsRepository from '../repositories/PollsRepository';
import RestaurantsRepository from '../repositories/RestaurantsRepository';
import AppError from '../errors/AppError';
import CheckWinnersOfTheWeekService from './CheckWinnersOfTheWeekService';

interface IRestaurant {
  id: string;
  name: string;
}

interface Request {
  user_id: string;
  restaurant_id: string;
}

interface Response {
  voted_today: boolean;
  restaurant?: IRestaurant;
}

class VoteForRestaurantService {
  public async execute({ user_id, restaurant_id }: Request): Promise<Response> {
    const pollsRepository = new PollsRepository();
    const checkWinnersOfTheWeek = new CheckWinnersOfTheWeekService();
    const date = startOfDay(new Date());
    const polls = await pollsRepository.find();
    const checkUserAlreadyVotedToday = polls.find(poll => {
      return poll.user_id === user_id && isSameDay(poll.date, date);
    });

    // check if the user already voted today
    if (checkUserAlreadyVotedToday) {
      throw new AppError('Você já votou hoje');
    }

    const winners = checkWinnersOfTheWeek.execute({ polls, date });
    const checkRestaurantAlreadyWonThisWeek = winners.find(winner => {
      return (
        winner.restaurant_id === restaurant_id && compareAsc(date, winner.date)
      );
    });

    // check if the restaurant already was chosen this week
    if (checkRestaurantAlreadyWonThisWeek) {
      throw new AppError(
        'Este restaurante já foi escolhido uma vez esta semana',
      );
    }

    const restaurantsRepository = new RestaurantsRepository();
    const restaurant = await restaurantsRepository.findById(restaurant_id);

    await pollsRepository.save({
      user_id,
      restaurant_id,
      date,
    });

    const poll = {
      voted_today: true,
      restaurant,
    };

    return poll;
  }
}

export default VoteForRestaurantService;

import { startOfHour, isSameDay } from 'date-fns';

import PollsRepository from '../repositories/PollsRepository';
import Poll from '../models/Poll';
import AppError from '../errors/AppError';
import CheckWinnersOfTheWeekService from './CheckWinnersOfTheWeekService';

interface Request {
  user_id: string;
  restaurant_id: string;
}

class VoteForRestaurantService {
  public async execute({ user_id, restaurant_id }: Request): Promise<Poll> {
    const pollsRepository = new PollsRepository();
    const checkWinnersOfTheWeek = new CheckWinnersOfTheWeekService();
    const date = startOfHour(new Date());
    const polls = await pollsRepository.find();
    const checkUserAlreadyVotedToday = polls.find(poll => {
      return poll.user_id === user_id && isSameDay(poll.date, date);
    });

    // check if the user already voted today
    if (checkUserAlreadyVotedToday) {
      throw new AppError('You already voted today');
    }

    const winners = checkWinnersOfTheWeek.execute({ polls, date });
    const checkRestaurantAlreadyWonThisWeek = winners.find(winner => {
      return winner.restaurant_id === restaurant_id;
    });

    // check if the restaurant already was chosen this week
    if (checkRestaurantAlreadyWonThisWeek) {
      throw new AppError('This restaurant already won this week');
    }

    const poll = await pollsRepository.save({
      user_id,
      restaurant_id,
      date,
    });

    return poll;
  }
}

export default VoteForRestaurantService;

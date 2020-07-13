import { isSameDay } from 'date-fns';
import Poll from '../models/Poll';

interface Request {
  date: Date;
  polls: Array<Poll>;
}

interface Response {
  [key: string]: number;
}

class CheckVotesOfTodayService {
  public execute({ date, polls }: Request): Response {
    const resultsToday: { [key: string]: number } = {};

    polls.forEach(poll => {
      if (isSameDay(poll.date, date)) {
        if (!resultsToday[poll.restaurant_id]) {
          resultsToday[poll.restaurant_id] = 1;
        } else {
          resultsToday[poll.restaurant_id] += 1;
        }
      }
    });

    return resultsToday;
  }
}

export default CheckVotesOfTodayService;

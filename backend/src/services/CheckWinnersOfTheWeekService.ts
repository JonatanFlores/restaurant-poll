import { isSameDay, startOfWeek, addDays, getDay } from 'date-fns';
import Poll from '../models/Poll';

interface Request {
  date: Date;
  polls: Array<Poll>;
}

interface Response {
  restaurant_id: string;
  votes: number;
  date: Date;
}

class CheckWinnersOfTheWeekService {
  public execute({ date, polls }: Request): Array<Response> {
    const monday = addDays(startOfWeek(date), 1);
    const today = getDay(date);
    const winners = [];

    for (let day = 0; day < today; ++day) {
      const resultsToday: { [key: string]: number } = {};
      const currentDate = addDays(monday, day);

      polls.forEach(poll => {
        if (isSameDay(poll.date, currentDate)) {
          if (!resultsToday[poll.restaurant_id]) {
            resultsToday[poll.restaurant_id] = 1;
          } else {
            resultsToday[poll.restaurant_id] += 1;
          }
        }
      });

      if (Object.keys(resultsToday).length) {
        let totalVotes = 0;
        let winner = {};

        Object.keys(resultsToday).forEach(restaurant_id => {
          const votes = resultsToday[restaurant_id];
          if (votes > totalVotes) {
            totalVotes = votes;
            winner = {
              restaurant_id,
              votes,
              date: currentDate,
            };
          }
        });

        winners.push(winner as Response);
      }
    }

    return winners;
  }
}

export default CheckWinnersOfTheWeekService;

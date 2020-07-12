import Poll from '../models/Poll';
import db from '../storage/database';

interface PollData {
  user_id: string;
  restaurant_id: string;
  date: Date;
}

class PollsRepository {
  public async find(): Promise<Array<Poll>> {
    return new Promise(resolve => {
      setTimeout(() => {
        const polls: Array<Poll> = [];

        db.polls.forEach(poll => {
          polls.push(
            new Poll({
              user_id: poll.user_id,
              restaurant_id: poll.restaurant_id,
              date: poll.date,
            }),
          );
        });

        resolve(polls);
      }, 1000);
    });
  }

  public async save({ user_id, restaurant_id, date }: PollData): Promise<Poll> {
    return new Promise(resolve => {
      setTimeout(() => {
        const poll = new Poll({
          user_id,
          restaurant_id,
          date,
        });

        db.polls.push(poll);

        resolve(poll);
      }, 1000);
    });
  }
}

export default PollsRepository;

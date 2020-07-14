import Poll from '../../models/Poll';
import Restaurant from '../../models/Restaurant';
import User from '../../models/User';
import pollsData from './data/polls';
import restaurantsData from './data/restaurants';
import usersData from './data/users';

interface IDatabase {
  polls: Array<Poll>;
  restaurants: Array<Restaurant>;
  users: Array<User>;
}

const database: IDatabase = {
  polls: [],
  restaurants: [],
  users: [],
};

if (process.env.NODE_ENV !== 'test') {
  pollsData.forEach(poll => {
    database.polls.push(
      new Poll({
        user_id: poll.user_id,
        restaurant_id: poll.restaurant_id,
        date: new Date(poll.date),
      }),
    );
  });

  restaurantsData.forEach(restaurant => {
    database.restaurants.push(
      new Restaurant({
        id: restaurant.id,
        name: restaurant.name,
      }),
    );
  });

  usersData.forEach(user => {
    database.users.push(
      new User({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    );
  });
}

export default database;

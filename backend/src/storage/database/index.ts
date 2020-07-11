import User from '../../models/User';
import Restaurant from '../../models/Restaurant';
import restaurantsData from './data/restaurants';
import usersData from './data/users';

interface IDatabase {
  restaurants: Array<Restaurant>;
  users: Array<User>;
}

const database: IDatabase = {
  restaurants: [],
  users: [],
};

if (process.env.NODE_ENV !== 'test') {
  database.restaurants = restaurantsData;
  database.users = usersData;
}

export default database;

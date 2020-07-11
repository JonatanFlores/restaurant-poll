import User from '../../models/User';
import usersData from './data/users';

interface IDatabase {
  users: Array<User>
}

let database: IDatabase = {
  users: []
};

if (process.env.NODE_ENV !== 'test') {
  database.users = usersData;
}

export default database;

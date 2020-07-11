import db from '../storage/database';
import User from '../models/User';

class UsersRepository {
  public findByEmail(email: string): Promise<User> {
    const { users } = db;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(users.find(u => u.email.toLowerCase() === email.toLowerCase()));
      }, 1000);
    });
  }
}

export default UsersRepository;

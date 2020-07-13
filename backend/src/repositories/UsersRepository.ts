import db from '../storage/database';
import User from '../models/User';

class UsersRepository {
  public findByEmail(email: string): Promise<User> {
    const { users } = db;
    return new Promise(resolve => {
      setTimeout(() => {
        let user;

        const userRecord = users.find(
          u => u.email.toLowerCase() === email.toLowerCase(),
        );

        if (userRecord) {
          user = new User(userRecord);
        }

        resolve(user);
      }, 1000);
    });
  }

  public findById(id: string): Promise<User> {
    const { users } = db;
    return new Promise(resolve => {
      setTimeout(() => {
        let user;

        const userRecord = users.find(u => u.id === id);

        if (userRecord) {
          user = new User(userRecord);
        }

        resolve(user);
      }, 1000);
    });
  }
}

export default UsersRepository;

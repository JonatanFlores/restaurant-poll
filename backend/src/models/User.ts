import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  constructor({ id, name, email, password }: Omit<User, 'generateToken'>) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public generateToken(): string {
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: this.id,
      expiresIn,
    });

    return token;
  }
}

export default User;

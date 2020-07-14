import { compare } from 'bcryptjs';

import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail e ou senha inválidos', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail e ou senha inválidos', 401);
    }

    const token = user.generateToken();

    return { token };
  }
}

export default AuthenticateUserService;

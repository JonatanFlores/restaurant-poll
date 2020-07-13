import { Router } from 'express';

import ensureAuthenticated from '../middlewares/enusreAuthenticated';
import UsersRepository from '../repositories/UsersRepository';

const router = Router();

router.get('/', ensureAuthenticated, async (request, response) => {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);
  delete user.password;

  return response.status(200).json({ user });
});

export default router;

import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const router = Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { token } = await authenticateUser.execute({ email, password });

  return response.status(200).json({ token });
});

export default router;

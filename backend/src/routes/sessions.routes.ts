import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const router = Router();

router.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  return response.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
});

export default router;

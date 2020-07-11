import { Router } from 'express';

const router = Router();

router.get('/', async (request, response) => {
  return response.json({ message: 'List of Polls' });
});

export default router;

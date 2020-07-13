import { Router } from 'express';

import ensureAuthenticated from '../middlewares/enusreAuthenticated';
import VoteForRestaurantService from '../services/VoteForRestaurantService';

const router = Router();

router.post('/', ensureAuthenticated, async (request, response) => {
  const { restaurant_id } = request.body;
  const { id } = request.user;
  const voteForRestaurant = new VoteForRestaurantService();
  const poll = await voteForRestaurant.execute({
    user_id: id,
    restaurant_id,
  });

  return response.json({ poll });
});

export default router;

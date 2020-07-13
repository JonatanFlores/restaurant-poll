import { Router } from 'express';

import ensureAuthenticated from '../middlewares/enusreAuthenticated';
import VoteForRestaurantService from '../services/VoteForRestaurantService';

const router = Router();

router.get('/', async (request, response) => {
  request.socketIO.emit('test', 'testing...');

  return response.json({ ok: true });
});

router.post('/', ensureAuthenticated, async (request, response) => {
  const { restaurant_id } = request.body;
  const { id } = request.user;
  const voteForRestaurant = new VoteForRestaurantService();
  const poll = await voteForRestaurant.execute({
    user_id: id,
    restaurant_id,
  });

  // tell the frontend there was new vote, so
  // the frontend needs to ask to a websocket for the
  // updated list of restaurants and votes
  request.socketIO.emit('new-vote-computed');

  return response.json({ poll });
});

export default router;

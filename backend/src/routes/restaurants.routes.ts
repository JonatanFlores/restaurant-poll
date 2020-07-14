import { Router } from 'express';

import GenerateListOfRestaurantsToVoteService from '../services/GenerateListOfRestaurantsToVoteService';

const router = Router();

router.get('/', async (request, response) => {
  const generateListOfRestaurantsToVote = new GenerateListOfRestaurantsToVoteService();
  const restaurants = await generateListOfRestaurantsToVote.execute();

  return response.json(restaurants);
});

export default router;

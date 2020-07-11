import { Router } from 'express';

import RestaurantsRepository from '../repositories/RestaurantsRepository';

const router = Router();

router.get('/', async (request, response) => {
  const restaurantsRepository = new RestaurantsRepository();
  const restaurants = await restaurantsRepository.find();

  return response.json(restaurants);
});

export default router;

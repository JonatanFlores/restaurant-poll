import { Router } from 'express';

import pollsRouter from './polls.routes';
import restaurantsRouter from './restaurants.routes';
import sessionsRouter from './sessions.routes';

const router = Router();

router.use('/polls', pollsRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/sessions', sessionsRouter);

export default router;

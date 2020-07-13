import { Router } from 'express';

import meRouter from './me.routes';
import pollsRouter from './polls.routes';
import restaurantsRouter from './restaurants.routes';
import sessionsRouter from './sessions.routes';

const router = Router();

router.use('/me', meRouter);
router.use('/polls', pollsRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/sessions', sessionsRouter);

export default router;

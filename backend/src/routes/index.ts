import { Router } from 'express';

import pollsRouter from './polls.routes';

const router = Router();

router.use('/polls', pollsRouter);

export default router;

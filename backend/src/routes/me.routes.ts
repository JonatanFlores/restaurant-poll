import { Router } from 'express';

import ensureAuthenticated from '../middlewares/enusreAuthenticated';
import GetLoggedInUserInformationService from '../services/GetLoggedInUserInformationService';

const router = Router();

router.get('/', ensureAuthenticated, async (request, response) => {
  const { id } = request.user;
  const getLoggedInUserInformation = new GetLoggedInUserInformationService();
  const { user, poll } = await getLoggedInUserInformation.execute({
    user_id: id,
  });

  return response.status(200).json({
    user,
    poll,
  });
});

export default router;

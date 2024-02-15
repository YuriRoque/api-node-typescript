import { Router } from 'express';

import { citiesController } from '../controllers/controllers';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá');
});

router.post('/cities', citiesController.createCity);

export default router;

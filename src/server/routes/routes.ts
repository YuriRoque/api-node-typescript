import { Router } from 'express';

import { citiesController } from '../controllers/controllers';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá');
});

router.get(
  '/cities',
  citiesController.getAllCitiesValidation,
  citiesController.getAllCities,
);
router.get(
  '/cities/:id',
  citiesController.getByIdValidation,
  citiesController.getById,
);
router.put(
  '/cities/:id',
  citiesController.updateByIdValidation,
  citiesController.updateById,
);
router.post(
  '/cities',
  citiesController.createCityValidation,
  citiesController.createCity,
);

export default router;

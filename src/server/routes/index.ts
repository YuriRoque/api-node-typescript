import { Router } from 'express';

import { citiesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá');
});

router.post(
  '/cities',
  citiesController.createCityValidation,
  citiesController.createCity,
);
router.delete(
  '/cities/:id',
  citiesController.deleteByIdValidation,
  citiesController.deleteById,
);
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

export default router;

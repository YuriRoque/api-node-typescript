import { Request, Response } from 'express';
import * as yup from 'yup';
import { City } from '../../db/models/City';
import { citiesProvider } from '../../db/providers/cities';
import { validation } from '../../shared/middlewares/Validation';

type BodyProps = Omit<City, 'id'> & {};

export const createCityValidation = validation(getSchema => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(150),
    }),
  ),
}));

export const createCity = async (req: Request<{}, {}, City>, res: Response) => {
  const result = await citiesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(500).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(201).json(result);
};

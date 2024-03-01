import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

type City = {
  name: string;
};

export const createCityValidation = validation(getSchema => ({
  body: getSchema<City>(
    yup.object().shape({
      name: yup.string().required().min(3),
    }),
  ),
}));

export const createCity = async (req: Request<{}, {}, City>, res: Response) => {
  return res.status(201).json(1);
};

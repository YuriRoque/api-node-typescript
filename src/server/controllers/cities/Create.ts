import { Request, Response } from 'express';
import * as yup from 'yup';
import { City } from '../../db/models/City';
import { validation } from '../../shared/middlewares/Validation';

type BodyProps = Omit<City, 'id'> & {};

export const createCityValidation = validation(getSchema => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
    }),
  ),
}));

export const createCity = async (req: Request<{}, {}, City>, res: Response) => {
  return res.status(201).json(1);
};

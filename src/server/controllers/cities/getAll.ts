import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

type QueryProps = {
  page?: number;
  limit?: number;
  filter?: string;
};

export const getAllCitiesValidation = validation(getSchema => ({
  query: getSchema<QueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    }),
  ),
}));

export const getAllCities = async (
  req: Request<{}, {}, {}, QueryProps>,
  res: Response,
) => {
  const validatedData: QueryProps | undefined = undefined;

  return res.send(validatedData);
};

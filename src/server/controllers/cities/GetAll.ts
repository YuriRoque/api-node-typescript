import { Request, Response } from 'express';
import * as yup from 'yup';
import { citiesProvider } from '../../db/providers/cities';
import { validation } from '../../shared/middlewares';

type QueryProps = {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
};

export const getAllCitiesValidation = validation(getSchema => ({
  query: getSchema<QueryProps>(
    yup.object().shape({
      id: yup.number().optional().moreThan(0),
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
  const result = await citiesProvider.getAll(
    Number(req.query.page) || 1,
    Number(req.query.limit) || 10,
    req.query.filter || '',
    Number(req.query.id),
  );
  const count = await citiesProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(500).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(500).json({
      errors: {
        default: count.message,
      },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  if (result instanceof Error) {
    return res.status(500).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(200).json(result);
};

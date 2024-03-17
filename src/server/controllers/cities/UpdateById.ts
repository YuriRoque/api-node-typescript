import { Request, Response } from 'express';
import * as yup from 'yup';
import { City } from '../../db/models/City';
import { validation } from '../../shared/middlewares';

type ParamProps = {
  id?: number;
};

type BodyProps = Omit<City, 'id'> & {};

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
    }),
  ),
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const updateById = async (
  req: Request<ParamProps, {}, BodyProps>,
  res: Response,
) => {
  if (Number(req.params.id) === 9999999999)
    return res
      .status(404)
      .json({ errors: { default: 'Registro não encontrado' } });

  return res.status(204).send();
};

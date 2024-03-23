import { Request, Response } from 'express';
import * as yup from 'yup';
import { City } from '../../db/models/City';
import { citiesProvider } from '../../db/providers/cities';
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
  if (!req.params.id) {
    return res
      .status(400)
      .json({ errors: { default: 'O parâmetro ID é obrigatório' } });
  }

  const result = await citiesProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(500).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res
    .status(204)
    .send({ message: 'Registro atualizado com sucesso', ...req.body });
};

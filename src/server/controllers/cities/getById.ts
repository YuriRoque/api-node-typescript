import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

type ParamProps = {
  id?: number;
};

export const getByIdValidation = validation(getSchema => ({
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const getById = async (req: Request<ParamProps>, res: Response) => {
  if (Number(req.params.id) === 9999999999)
    return res
      .status(404)
      .json({ errors: { default: 'Resgistro não encontrado' } });

  return res.status(200).json({ id: req.params.id, name: 'Cuiabá' });
};

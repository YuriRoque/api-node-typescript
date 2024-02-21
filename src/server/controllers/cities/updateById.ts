import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

type ParamProps = {
  id?: number;
};

type BodyProps = {
  nome: string;
};

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    }),
  ),
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const updateById = async (req: Request<ParamProps>, res: Response) => {
  return res.status(400).send('Ainda em implementação');
};

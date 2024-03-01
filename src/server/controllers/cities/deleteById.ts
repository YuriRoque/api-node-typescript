import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

type ParamProps = {
  id?: number;
};

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const deleteById = async (req: Request<ParamProps>, res: Response) => {
  if (Number(req.params.id) === 9999999999)
    return res
      .status(404)
      .json({ errors: { default: 'Resgistro não encontrado' } });

  console.log(req.params);

  return res.status(204).json(1);
};

import { Request, Response } from 'express';
import * as yup from 'yup';
import { citiesProvider } from '../../db/providers/cities';
import { validation } from '../../shared/middlewares';

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
  if (!req.params.id) {
    return res
      .status(400)
      .json({ errors: { default: 'O parâmetro ID é obrigatório' } });
  }

  if (typeof req.params.id === 'number') {
    const result = await citiesProvider.deleteById(Number(req.params.id));

    if (result instanceof Error) {
      return res.status(500).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(204).json({ message: 'Registro removido com sucesso' });
  }
};

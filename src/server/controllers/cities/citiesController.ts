import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';
import * as updateById from './updateById';

export const citiesController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
};

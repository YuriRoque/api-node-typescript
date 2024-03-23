import { tableNames } from '../../TableNames';
import { Knex } from '../../knex';
import { City } from '../../models';

export const updateById = async (
  id: number,
  city: Omit<City, 'id'>,
): Promise<void | Error> => {
  try {
    const result = await Knex(tableNames.city).where('id', id).update(city);

    if (result > 0) return;

    return new Error(`Erro ao atualizar o registro ${id}`);
  } catch (err) {
    console.log(err);

    return new Error(`Erro ao atualizar o registro ${id}`);
  }
};

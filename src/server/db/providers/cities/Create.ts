import { Knex } from '../../knex';
import { City } from '../../models/City';
import { tableNames } from '../../TableNames';

export const create = async (
  city: Omit<City, 'id'>,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(tableNames.city).insert(city).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (err) {
    console.log(err);

    return Error('Erro ao cadastrar o registro');
  }
};

import { tableNames } from '../../TableNames';
import { Knex } from '../../knex';
import { City } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0,
): Promise<City[] | Error> => {
  try {
    const result = await Knex(tableNames.city)
      .select('*')
      .where('id', Number(id))
      .orWhere('name', 'like', `%${filter}%`)
      .limit(limit)
      .offset((page - 1) * limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(tableNames.city)
        .select('*')
        .where('id', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    if (result.length > 0) return result;

    return new Error('Nenhum registro encontrado');
  } catch (err) {
    console.log(err);

    return new Error('Erro ao buscar os registros');
  }
};

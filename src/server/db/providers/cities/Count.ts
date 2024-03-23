import { tableNames } from '../../TableNames';
import { Knex } from '../../knex';

export const count = async (filter = '') => {
  try {
    const [result] = await Knex(tableNames.city)
      .where('name', 'like', `%${filter}`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(result.count))) return Number(result.count);

    return new Error('Erro ao buscar a quantidade total de registros');
  } catch (err) {
    console.log(err);

    return new Error('Erro ao buscar a quantidade total de registros');
  }
};

import { tableNames } from '../../TableNames';
import { Knex } from '../../knex';
import { City } from '../../models';

export const getById = async (id: number): Promise<City | Error> => {
  try {
    const result = await Knex(tableNames.city).where('id', id).first();

    if (result) return result;

    return new Error(`Registro com o id ${id} não encontrado`);
  } catch (err) {
    console.log(err);

    return new Error(`Erro ao buscar o registro ${id}`);
  }
};

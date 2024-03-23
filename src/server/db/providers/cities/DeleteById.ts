import { tableNames } from '../../TableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(tableNames.city).where('id', id).del();

    if (result > 0) return;

    return new Error(`Erro ao deletar o registro ${id}`);
  } catch (err) {
    console.log(err);

    return new Error(`Erro ao deletar o registro ${id}`);
  }
};

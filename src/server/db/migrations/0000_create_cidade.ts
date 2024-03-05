import type { Knex } from 'knex';
import { tableNames } from '../tableNames';

export async function up(knex: Knex) {
  knex.schema
    .createTable(tableNames.cidade, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).index().notNullable();

      table.comment('Table used to store cities');
    })
    .then(() => {
      console.log(`# Create table ${tableNames.cidade}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.cidade).then(() => {
    console.log(`# Drop table ${tableNames.cidade}`);
  });
}

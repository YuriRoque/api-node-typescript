import type { Knex } from 'knex';
import { tableNames } from '../tableNames';

export async function up(knex: Knex) {
  knex.schema
    .createTable(tableNames.city, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).index().notNullable();

      table.comment('Table used to store cities');
    })
    .then(() => {
      console.log(`# Create table ${tableNames.city}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.city).then(() => {
    console.log(`# Drop table ${tableNames.city}`);
  });
}

import { City } from '../../models/City';

declare module 'knex/types/table' {
  type Tables = {
    city: City;
    // person: Person;
    // user: User;
  };
}

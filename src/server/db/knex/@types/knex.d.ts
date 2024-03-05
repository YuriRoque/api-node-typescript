import { City } from '../../models/city';

declare module 'knex/types/table' {
  type Tables = {
    city: City;
    // person: Person;
    // user: User;
  };
}

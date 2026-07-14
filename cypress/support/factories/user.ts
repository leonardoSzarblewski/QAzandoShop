import { faker } from '@faker-js/faker';

export interface userData {
  name: string;
  email: string;
  password: string;
  invalidEmail: string;
  invalidPassword: string;
}

export const userData: userData = {
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password({
    length: 6,
  }),
  invalidEmail: 'teste',
  invalidPassword: faker.internet.password({
    length: 5,
  }),
};

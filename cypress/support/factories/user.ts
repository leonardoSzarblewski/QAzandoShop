import { faker } from '@faker-js/faker';

export interface userData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  password: string;
  invalidEmail: string;
  invalidPassword: string;
}

export const userData: userData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  companyName: faker.company.name(),
  email: faker.internet.email(),
  password: faker.internet.password({
    length: 6,
  }),
  invalidEmail: 'teste',
  invalidPassword: faker.internet.password({
    length: 5,
  }),
};

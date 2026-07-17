import { userData } from '../factories/user';
import { faker } from '@faker-js/faker';

// Acessa a página de contrate-nos
Cypress.Commands.add('contactUs', () => {
  cy.get(':nth-child(4) > .offcanvas-toggle > .fa').click();
  cy.get('#menupagesText').click();
  cy.get('#contact1Page').click();
});

// Preenche o formulário de contato
Cypress.Commands.add('fillsContactUs', () => {
  cy.get('[name="name"]').type(userData.firstName);
  cy.get('[name="email"]').type(userData.email);
  cy.get('[name="phone"]').type('51989176524');
  cy.get('[name="subject"]').type(faker.word.verb());
  cy.get('[name="message"]').invoke('val', faker.lorem.sentences());
});

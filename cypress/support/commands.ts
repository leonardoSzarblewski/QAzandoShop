import { userData, address } from '../support/factories/user';
import { faker } from '@faker-js/faker';

// Preenche formulário de login
Cypress.Commands.add('fillsLogin', (email: string, password: string) => {
  cy.get('#user').type(email);
  cy.get('#password').type(password);
  cy.get('#materialUnchecked').check();
});

// Preenche formulário de cadastro
Cypress.Commands.add('fillRegistration', (name: string, email: string, password: string) => {
  cy.get('#user').type(name);
  cy.get('#email').type(email);
  cy.get('#password').type(password);
});

// Acessa a página de produtos
Cypress.Commands.add('openShop', () => {
  cy.get(':nth-child(4) > .offcanvas-toggle > .fa').click();
  cy.get('#menuShopText').click();
  cy.get(':nth-child(2) > :nth-child(1) > .mobile-sub-menu > :nth-child(1) > a').click();
});

// Acessa os detalhes do carrinho de compras
Cypress.Commands.add('openDetailsCart', () => {
  cy.get(':nth-child(3) > .offcanvas-toggle > .fa').click();
  cy.contains('a', 'View Cart').click();
});

// Adiciona um item ao carrinho de compras
Cypress.Commands.add('addItemCart', (item: string) => {
  cy.get(item).click();
  cy.contains('a', 'Add To Cart').click();
});

// Acessar a tela de checkout através do carrinho de compras
Cypress.Commands.add('openCheckout', () => {
  cy.get(':nth-child(3) > .offcanvas-toggle > .fa').click();
  cy.contains(':nth-child(2) > .theme-btn-one', 'Checkout').click();
});

// Preenche as informações para checkout
Cypress.Commands.add('fillsBillingInformation', (email: string = userData.email) => {
  cy.get('#fname').type(userData.firstName);
  cy.get('#lname').type(userData.lastName);
  cy.get('#cname').type(userData.companyName);
  cy.get('#email').type(email);
  cy.get('#country').select(1);
  cy.get('#city').select(1);
  cy.get('#zip').type(address.zipCode);
  cy.get('#faddress').type(address.fullAddress);
  cy.get('#messages').type(faker.lorem.sentences());
  cy.get('#materialUnchecked').check();
});

// Escolhe o método de pagamento
Cypress.Commands.add('selectPaymentMethod', (method: string, description: string) => {
  cy.contains('label', method).click();
  cy.contains('p', description).should('be.visible');
  cy.get(':nth-child(2) > :nth-child(2) > .theme-btn-one').click();
});

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

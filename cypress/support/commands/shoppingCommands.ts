import { userData, address } from '../factories/user';
import { faker } from '@faker-js/faker';

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

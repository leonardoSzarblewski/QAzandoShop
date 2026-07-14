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

// Deve acessar os detalhes do carrinho de compras
Cypress.Commands.add('openDetailsCart', () => {
  cy.get(':nth-child(3) > .offcanvas-toggle > .fa').click();
  cy.contains('a', 'View Cart').click();
});

// Deve adicionar um item ao carrinho de compras
Cypress.Commands.add('addItemCart', (item: string) => {
  cy.get(item).click();
  cy.contains('a', 'Add To Cart').click();
});

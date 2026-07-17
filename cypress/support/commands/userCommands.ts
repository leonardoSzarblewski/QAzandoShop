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

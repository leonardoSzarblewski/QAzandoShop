Cypress.Commands.add('fillsLogin', (email, password) => {
    cy.get('#user').type(email);
    cy.get('#password').type(password);
    cy.get('#materialUnchecked').check()
});
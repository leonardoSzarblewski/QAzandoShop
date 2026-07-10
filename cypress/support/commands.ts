Cypress.Commands.add('fillsLogin', (email: string, password: string) => {
    cy.get('#user').type(email);
    cy.get('#password').type(password);
    cy.get('#materialUnchecked').check();
});

Cypress.Commands.add('fillRegistration', (name: string, email: string, password: string) => {
    cy.get('#user').type(name);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
});

Cypress.Commands.add('openShop', () => {
    cy.get(':nth-child(4) > .offcanvas-toggle > .fa').click();
    cy.get('#menuShopText').click();
    cy.get(':nth-child(2) > :nth-child(1) > .mobile-sub-menu > :nth-child(1) > a').click();
});


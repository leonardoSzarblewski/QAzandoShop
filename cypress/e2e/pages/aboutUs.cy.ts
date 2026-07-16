import { userData } from '../../support/factories/user';

describe('About Us', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.fillsLogin(userData.email, userData.password);
    cy.get('#btnLogin').click();

    cy.contains('button', 'OK').click();
  });

  it('should access the about us page', () => {
    cy.get(':nth-child(4) > .offcanvas-toggle').click();
    cy.get('#menuPagesMenu').click();
    cy.get('#aboutPage').click();

    cy.url().should('include', '/about');
    cy.contains('h2', 'Sobre a QAZANDO').should('be.visible');
    cy.contains(
      'h4',
      'Se você quer ficar "qazando" em um nível a cima, esse é o lugar certo!'
    ).should('be.visible');
  });
});

import { userData } from '../../support/factories/user';

describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.fillsLogin(userData.email, userData.password);
    cy.get('#btnLogin').click();

    cy.contains('button', 'OK').click();
  });

  it('deve acessar a pagina about us', () => {
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

import { userData } from '../../support/factories/user';
import { faker } from '@faker-js/faker';

describe('Contact Us', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.fillsLogin(userData.email, userData.password);
    cy.get('#btnLogin').click();

    cy.contains('button', 'OK').click();

    cy.contactUs();
  });

  it('should submit the contact form', () => {
    cy.fillsContactUs();
    cy.get('.submit_bitton_contact_one > .theme-btn-one').click();

    cy.get('#swal2-title').should('contain', 'Thank You');
  });

  it('validates required fields in the form', () => {
    cy.get('[name="name"]').should('have.attr', 'required');
    cy.get('[name="email"]').should('have.attr', 'required');
    cy.get('[name="phone"]').should('have.attr', 'required');
    cy.get('[name="subject"]').should('have.attr', 'required');
    cy.get('[name="message"]').should('not.have.attr', 'required');
  });

  it('submits the form filling only the required fields', () => {
    cy.fillsContactUs();
    cy.get('[name="message"]').invoke('val', faker.lorem.sentences()).clear();
    cy.get('.submit_bitton_contact_one > .theme-btn-one').click();

    cy.get('#swal2-title').should('contain', 'Thank You');
  });
});

import { userData } from '../../support/factories/user';

describe('Register User', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should register a new user successfully', () => {
    cy.fillRegistration(userData.firstName, userData.email, userData.password);
    cy.get('#btnRegister').click();

    cy.get('#swal2-title').should('contain', 'Cadastro realizado!');
    cy.get('#swal2-html-container').should('contain', `Bem-vindo ${userData.firstName}`);

    cy.contains('button', 'OK').click();
    cy.get('#userLogged').should('contain', userData.firstName);
  });

  it('should display an error message when the name field is left empty', () => {
    cy.fillRegistration(userData.firstName, userData.email, userData.password);
    cy.get('#user').clear();
    cy.get('#btnRegister').click();

    cy.get('#errorMessageFirstName').should('contain', 'O campo nome deve ser prenchido');
  });

  it('should display an error message when the email field is left empty', () => {
    cy.fillRegistration(userData.firstName, userData.email, userData.password);
    cy.get('#email').clear();
    cy.get('#btnRegister').click();

    cy.get('#errorMessageFirstName').should(
      'contain',
      'O campo e-mail deve ser prenchido corretamente'
    );
  });

  it('should display an error message when the password field is left empty', () => {
    cy.fillRegistration(userData.firstName, userData.email, userData.password);
    cy.get('#password').clear();
    cy.get('#btnRegister').click();

    cy.get('#errorMessageFirstName').should(
      'contain',
      'O campo senha deve ter pelo menos 6 dígitos'
    );
  });

  it('should display an error message when the password has fewer than 6 digits', () => {
    cy.fillRegistration(userData.firstName, userData.email, userData.invalidPassword);
    cy.get('#btnRegister').click();

    cy.get('#errorMessageFirstName').should(
      'contain',
      'O campo senha deve ter pelo menos 6 dígitos'
    );
  });

  it('should display an error message when the email format is invalid', () => {
    cy.fillRegistration(userData.firstName, userData.invalidEmail, userData.password);
    cy.get('#btnRegister').click();

    cy.get('#errorMessageFirstName').should(
      'contain',
      'O campo e-mail deve ser prenchido corretamente'
    );
  });

  context('registration through the login screen link', () => {
    it('should register the user through the link on the login screen', () => {
      cy.visit('/login');
      cy.get('#createAccount').click();

      cy.fillRegistration(userData.firstName, userData.email, userData.password);
      cy.get('#btnRegister').click();

      cy.get('#swal2-title').should('contain', 'Cadastro realizado!');
      cy.get('#swal2-html-container').should('contain', `Bem-vindo ${userData.firstName}`);

      cy.contains('button', 'OK').click();
      cy.get('#userLogged').should('contain', userData.firstName);
    });
  });
});

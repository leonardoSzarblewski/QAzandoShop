import { userData } from '../../support/factories/user';

describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.fillsLogin(userData.email, userData.password);
    cy.get('#btnLogin').click();

    cy.contains('button', 'OK').click();

    cy.openCheckout();
  });

  it('should save registered billing information successfully', () => {
    cy.fillsBillingInformation();
    cy.contains('button', 'Save').click();

    cy.contains('h3', 'Billings Information registred with success!').should('be.visible');
  });

  it('should place the order using the Direct Bank Transfer option successfully', () => {
    cy.fillsBillingInformation();
    cy.contains('button', 'Save').click();

    cy.selectPaymentMethod('Direct Bank Transfer', 'Direct Bank Transfer');
    cy.contains('h3', 'Congrats! Your order was created with sucess!').should('be.visible');
  });

  it('should place the order using the Mobile Banking option successfully', () => {
    cy.fillsBillingInformation();
    cy.contains('button', 'Save').click();

    cy.selectPaymentMethod('Mobile Banking', 'Direct Mobile Transfer');
    cy.contains('h3', 'Congrats! Your order was created with sucess!').should('be.visible');
  });

  it('should place the order using the PayPal option successfully', () => {
    cy.fillsBillingInformation();
    cy.contains('button', 'Save').click();

    cy.selectPaymentMethod(
      'Paypal',
      'Some placeholder content for the second accordion panel. This panel is hidden by default.'
    );
    cy.contains('h3', 'Congrats! Your order was created with sucess!').should('be.visible');
  });

  it('should allow placing the order by filling only the required first name, last name, and email fields', () => {
    cy.get('#fname').type(userData.firstName);
    cy.get('#lname').type(userData.lastName);
    cy.get('#email').type(userData.email);
    cy.get('#materialUnchecked').check();
    cy.contains('button', 'Save').click();

    cy.get(':nth-child(2) > :nth-child(2) > .theme-btn-one').click();
    cy.contains('h3', 'Congrats! Your order was created with sucess!').should('be.visible');
  });

  it('should display an error message when trying to place the order without saving billing information', () => {
    cy.fillsBillingInformation();
    cy.get(':nth-child(2) > :nth-child(2) > .theme-btn-one').click();

    cy.get('#errorMessageFirstName').should('contain', 'Preencha os dados de pagamento!');
  });

  it('should display an error message when trying to save billing information with empty fields', () => {
    cy.contains('button', 'Save').click();

    cy.contains('span', 'O campo First Name deve ser prenchido').should('be.visible');
    cy.contains('span', 'O campo Last Name deve ser prenchido').should('be.visible');
    cy.contains('span', 'O campo Company deve ser prenchido').should('be.visible');
    cy.contains('span', 'O campo E-mail deve ser prenchido ou é inválido').should('be.visible');
    cy.contains('span', 'O campo Country deve ser prenchido').should('be.visible');
    cy.contains('span', 'O campo City deve ser prenchido').should('be.visible');
    cy.contains('span', 'O campo Zip Code deve ser prenchido').should('be.visible');
    cy.contains('span', 'O campo Address deve ser prenchido').should('be.visible');
    cy.contains('span', 'O campo Additional Notes deve ser prenchido').should('be.visible');
  });

  it('should display an error message when trying to save billing information with an invalid email', () => {
    cy.fillsBillingInformation(userData.invalidEmail);

    cy.contains('button', 'Save').click();
    cy.contains('span', 'O campo E-mail deve ser prenchido ou é inválido').should('be.visible');
  });
});

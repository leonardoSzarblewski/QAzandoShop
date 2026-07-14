import { userData } from '../../support/factories/user';

describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.fillsLogin(userData.email, userData.password);
    cy.get('#btnLogin').click();

    cy.contains('button', 'OK').click();
  });

  it('should add an item to the shopping cart', () => {
    cy.get(':nth-child(3) > .offcanvas-toggle > .fa').click();
    cy.contains('a', 'Maxi Dress').should('not.exist');
    cy.get('#offcanvas-add-cart > .offcanvas-header > .offcanvas-close').click();

    cy.openShop();
    cy.addItemCart(':nth-child(4) > .product_wrappers_one > .thumb > .image > .hover-image');

    cy.get('#swal2-html-container').should('contain', 'Successfully added to your Cart');

    cy.get(':nth-child(3) > .offcanvas-toggle > .fa').click();
    cy.contains('a', 'Maxi Dress').should('exist');
  });

  it('should display an error message when trying to add an item that is already in the cart', () => {
    cy.openShop();
    cy.addItemCart(':nth-child(5) > .product_wrappers_one > .thumb > .image > .hover-image');

    cy.get('#swal2-html-container').should('contain', 'This product is already added in your Cart');
  });

  it('should change the price when deleting an item from the cart', () => {
    cy.get(':nth-child(3) > .offcanvas-toggle > .fa').click();
    cy.contains('a', 'Fit-Flare Dress').should('exist');
    cy.contains('span', '$107.00').should('be.visible');
    cy.get(
      '.offcanvas-cart > :nth-child(1) > .text-right > .offcanvas-wishlist-item-delete > .fa'
    ).click();

    cy.contains('span', '$55.00').should('be.visible');
    cy.contains('a', 'Fit-Flare Dress').should('not.exist');
  });

  it('should access the checkout screen through the shopping cart', () => {
    cy.get(':nth-child(3) > .offcanvas-toggle > .fa').click();
    cy.contains(':nth-child(2) > .theme-btn-one', 'Checkout').click();

    cy.url().should('include', '/checkout-one');
  });

  it('should access the details screen through the shopping cart', () => {
    cy.openDetailsCart();

    cy.url().should('include', '/cart');
  });
});

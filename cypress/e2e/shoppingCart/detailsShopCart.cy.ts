import { userData } from '../../support/factories/user'

describe('Shopping Cart', () => {
  
  beforeEach(() => {
    cy.visit('/login')

    cy.fillsLogin(userData.email, userData.password)
    cy.get('#btnLogin').click()

    cy.contains('button', 'OK').click()

    cy.openDetailsCart()
  })

  it('should change the total value when adding an item to the cart', () => {
    cy.contains('a', 'Green Dress For Woman').should('not.exist')
    cy.contains('p', '$107.00').should('be.visible')

    cy.openShop()
    cy.addItemCart(':nth-child(1) > .product_wrappers_one > .thumb > .image > .hover-image')
    
    cy.get('#swal2-html-container').should('contain', 'Successfully added to your Cart')  
    cy.openDetailsCart()

    cy.contains('a', 'Green Dress For Woman').should('exist')
    cy.contains('p', '$145.00').should('be.visible')
  })

  it('should change the total value when deleting an item from the cart', () => {
    cy.contains('a', 'Fit-Flare Dress').should('exist')
    cy.get(':nth-child(1) > .product_remove > .fa').click()
    cy.contains('a', 'Fit-Flare Dress').should('not.exist')
  })

  it('should delete all items from the cart', () => {
    cy.contains('button', 'Clear cart').click()
    cy.contains('h2', 'YOUR CART IS EMPTY').should('be.visible')
    cy.contains('a', 'Continue Shopping').click()

    cy.url().should('include', '/shop')
  })

  it('should indicate that the discount coupon is invalid', () => {
    cy.get('.mb-2').type('INVALIDCOUPON')
    cy.get('form > .theme-btn-one').click() 

    cy.get('#swal2-html-container').should('contain', 'Invalid Cuppon Code')
    cy.contains('button', 'OK').click()
  })

  it('should access the checkout screen through the cart details', () => {
    cy.contains('a', 'Proceed to Checkout').click()
    cy.url().should('include', '/checkout-one')
  })
})
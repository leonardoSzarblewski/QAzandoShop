import { userData } from '../../support/factories/user'

describe('Wishlist', () => {
  /**
      Devemos evitar o uso do seletor do Cypress que utiliza o caminho completo do elemento.
      Utilizamos aqui pois os elementos não têm data-cy nem id, e não conseguimos selecionar de outra forma.
  **/
  
  beforeEach(() => {
    cy.visit('/login')

    cy.fillsLogin(userData.email, userData.password)
    cy.get('#btnLogin').click()

    cy.contains('button', 'OK').click()
  })

  it('should add an item to the wishlist', () => {
    cy.openShop()
    cy.get(':nth-child(1) > .product_wrappers_one > .thumb > .actions > .wishlist').click()

    cy.get('#swal2-html-container').should('contain', 'Added to Wishlist')
    cy.contains('button', 'OK').click()

    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Green Dress For Woman').should('exist')
  })

  it('should add an item to the wishlist from the product details', () => {
    cy.openShop()
    cy.get(':nth-child(1) > .product_wrappers_one > .thumb > .image > .hover-image').click()
    cy.contains('a', 'Add To Wishlist').click()

    cy.get('#swal2-title').should('contain', 'Success')
    cy.contains('button', 'OK').click()

    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Green Dress For Woman').should('exist')
  })

  it('should show an error message when trying to add an item that is already in the wishlist', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Rocking Chair').click()
    cy.contains('a', 'Add To Wishlist').click()

    cy.get('#swal2-title').should('contain', 'Failed')
    cy.get('#swal2-html-container').should('contain', 'Already Added in Wishlist')

    cy.contains('button', 'OK').click()
  })

  it('should remove an item from the wishlist', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Boho Tops for Girls').should('exist')

    cy.get('.offcanvas-wishlist > :nth-child(1) > .text-right > .offcanvas-wishlist-item-delete').click()
    cy.contains('a', 'Boho Tops for Girls').should('not.exist')
  })

  it('should delete an item from the wishlist details page', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'View wishlist').click()
    cy.contains('a', 'Boho Tops for Girls').should('exist')

    cy.get(':nth-child(1) > .product_remove > .fa').click()
    cy.contains('a', 'Boho Tops for Girls').should('not.exist')
  })

  it('should add an item to the cart from the wishlist details page', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'View wishlist').click()
    cy.contains('button', 'Add to cart').click()

    cy.get('#swal2-title').should('contain', 'Success!')
  })
})
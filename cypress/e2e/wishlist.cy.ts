import { userData } from '../support/factories/user'

describe('login', () => {
  
  beforeEach(() => {
    cy.visit('/login')

    cy.fillsLogin(userData.email, userData.password)
    cy.get('#btnLogin').click()

    cy.contains('button', 'OK').click()
  })

  it('deve adicionar um item da lista de desejo', () => {
    /**
        Devemos evitar o uso do seletor do cypress que utiliza o caminho completo do elemento,  
        utilizamos aqui pois os elementos não tem data-cy e nem id, e não conseguimos selecionar de outra forma.
    **/
    cy.get(':nth-child(4) > .offcanvas-toggle > .fa').click()
    cy.get('#menuShopText').click()
    cy.get(':nth-child(2) > :nth-child(1) > .mobile-sub-menu > :nth-child(1) > a').click()
    cy.get(':nth-child(1) > .product_wrappers_one > .thumb > .actions > .wishlist').click()

    cy.get('#swal2-html-container').should('contain', 'Added to Wishlist')  
    cy.contains('button', 'OK').click()

    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Green Dress For Woman').should('exist')
  })

  it('deve adicionar um item da lista de desejo através dos detalhes do produto', () => {
    cy.get(':nth-child(4) > .offcanvas-toggle > .fa').click()
    cy.get('#menuShopText').click()
    cy.get(':nth-child(2) > :nth-child(1) > .mobile-sub-menu > :nth-child(1) > a').click()
    cy.get(':nth-child(1) > .product_wrappers_one > .thumb > .image > .hover-image').click()
    cy.contains('a', 'Add To Wishlist').click()

    cy.get('#swal2-title').should('contain', 'Success')
    cy.contains('button', 'OK').click()

    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Green Dress For Woman').should('exist')
  })

  it('deve exibir mensagem de erro ao tentar adicionar um item da lista de desejo que ja está na lista', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Rocking Chair').click()
    cy.contains('a', 'Add To Wishlist').click()

    cy.get('#swal2-title').should('contain', 'Failed')
    cy.get('#swal2-html-container').should('contain', 'Already Added in Wishlist')

    cy.contains('button', 'OK').click()
  })

  it('deve excluir um item da lista de desejo', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'Boho Tops for Girls').should('exist')

    cy.get('.offcanvas-wishlist > :nth-child(1) > .text-right > .offcanvas-wishlist-item-delete').click()
    cy.contains('a', 'Boho Tops for Girls').should('not.exist')
  })

  it('deve deletar um item através dos detalhes da lista de desejo', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'View wishlist').click()
    cy.contains('a', 'Boho Tops for Girls').should('exist')

    cy.get(':nth-child(1) > .product_remove > .fa').click()
    cy.contains('a', 'Boho Tops for Girls').should('not.exist')
  })

  it('deve adicionar um item ao carrinho através dos detalhes da lista de desejo', () => {
    cy.get('.mobile-right-side > .header-action-link > :nth-child(2) > .offcanvas-toggle > .fa').click()
    cy.contains('a', 'View wishlist').click()
    cy.contains('button', 'Add to cart').click()

    cy.get('#swal2-title').should('contain', 'Success!')
  })
})
import { userData } from '../../support/factories/user'

describe('Shopping Cart', () => {
  
  beforeEach(() => {
    cy.visit('/login')

    cy.fillsLogin(userData.email, userData.password)
    cy.get('#btnLogin').click()

    cy.contains('button', 'OK').click()

    cy.openDetailsCart()
  })

  it.only('deve alterar o valor total ao deletar um item do carrinho', () => {

  })

    it.only('deve deletar todos os itens do carrinho', () => {

  })

    it.only('deve indicar que o cupom está invalido', () => {

  })

      it.only('deve acessar a tela do checkout através dos detalhes do carrinho', () => {

  })
})
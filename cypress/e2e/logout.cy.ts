import { userData } from '../support/factories/user'

describe('login', () => {
  
  beforeEach(() => {
    cy.visit('/')

    cy.fillsLogin(userData.email, userData.password)
    cy.get('#btnLogin').click()

    cy.contains('button', 'OK').click()
  })

  it('Should log out the user', () => {
    cy.contains('a', 'logout').click()

    cy.get('#swal2-title').should('contain', 'Logout Sucessfull')
    cy.contains('button', 'OK').click()
    
    cy.url().should('eq', 'https://automationpratice.com.br/login')
  })

  it('Should log out through the user menu', () => {
    cy.contains('#userLogged', userData.email)
        .find('a[href="/my-account#!"]')
        // Não é recomendado utilizar force: true, mas é necessário neste caso devido a um bug na interface que impede o clique no elemento.
        .click({ force: true }) 

    cy.get('#swal2-title').should('contain', 'Logout realizado')
    cy.contains('button', 'OK').click()

    cy.url().should('eq', 'https://automationpratice.com.br/login#!')
  })
})

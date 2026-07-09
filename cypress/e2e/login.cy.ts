import { userData } from '../support/factories/user'

describe('login', () => {
  
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should log in successfully', () => {
    cy.fillsLogin(userData.email, userData.password)
    cy.get('#btnLogin').click()

    cy.get('#swal2-title').should('contain', 'Login realizado')  
    cy.get('#swal2-html-container').should('contain', 'Olá, ' + userData.email)

    cy.contains('button', 'OK').click()
    cy.get('#userLogged').should('contain', userData.email)
  })

  it('Should indicate that the email field is required', () => {
    cy.fillsLogin(userData.email, userData.password)
    cy.get('#user').clear()
    cy.get('#btnLogin').click()

    cy.contains('span', 'E-mail inválido.').should('be.visible')
  })  

  it('Should indicate that the password field is required', () => {
    cy.fillsLogin(userData.email, userData.password)
    cy.get('#password').clear()
    cy.get('#btnLogin').click()

    cy.contains('span', 'Senha inválida.').should('be.visible')
  })  

  it('Should show an error when the email format is invalid', () => {
    cy.fillsLogin(userData.invalidEmail, userData.password)
    cy.get('#btnLogin').click()

    cy.contains('span', 'E-mail inválido.').should('be.visible')
  })  

  it('Should show an error when the password has fewer than 6 characters', () => {
    cy.fillsLogin(userData.email, userData.invalidPassword)
    cy.get('#btnLogin').click()

    cy.contains('span', 'Senha inválida.').should('be.visible')
  })  
})
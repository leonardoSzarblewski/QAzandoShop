import { faker } from '@faker-js/faker'

const user = {
  email: faker.internet.email(),
  password: faker.internet.password({ length: 6 }),
  invalidEmail: 'teste',
  invalidPassword: faker.internet.password({ length: 5 }),
}

describe('login', () => {
  
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should log in successfully', () => {
    cy.fillsLogin(user.email, user.password)
    cy.get('#btnLogin').click()

    cy.get('#swal2-title').should('contain', 'Login realizado')  
    cy.get('#swal2-html-container').should('contain', 'Olá, ' + user.email)

    cy.contains('button', 'OK').click()
    cy.get('#userLogged').should('contain', user.email)
  })

  it('Should indicate that the email field is required', () => {
    cy.fillsLogin(user.email, user.password)
    cy.get('#user').clear()
    cy.get('#btnLogin').click()

    cy.contains('span', 'E-mail inválido.').should('be.visible')
  })  

  it('Should indicate that the password field is required', () => {
    cy.fillsLogin(user.email, user.password)
    cy.get('#password').clear()
    cy.get('#btnLogin').click()

    cy.contains('span', 'Senha inválida.').should('be.visible')
  })  

  it('Should show an error when the email format is invalid', () => {
    cy.fillsLogin(user.invalidEmail, user.password)
    cy.get('#btnLogin').click()

    cy.contains('span', 'E-mail inválido.').should('be.visible')
  })  

  it('Should show an error when the password has fewer than 6 characters', () => {
    cy.fillsLogin(user.email, user.invalidPassword)
    cy.get('#btnLogin').click()

    cy.contains('span', 'Senha inválida.').should('be.visible')
  })  
})
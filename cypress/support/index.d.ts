declare global {
  namespace Cypress {
    interface Chainable {
      fillsLogin(email: string, password: string): Chainable<void>;
      fillRegistration(name: string, email: string, password: string): Chainable<void>;
    }
  }
}

export {};

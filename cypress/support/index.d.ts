declare global {
  namespace Cypress {
    interface Chainable {
      fillsLogin(email: string, password: string): Chainable<void>;
      fillRegistration(name: string, email: string, password: string): Chainable<void>;
      openShop(): Chainable<void>;
      openDetailsCart(): Chainable<void>;
      addItemCart(item: string): Chainable<void>;
      openCheckout(): Chainable<void>;
    }
  }
}

export {};

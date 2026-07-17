# QAZANDOSHOP

Projeto de automação de testes end-to-end (E2E) para a loja de demonstração da QAzando, utilizando Cypress com TypeScript.

## Visão geral

Este repositório contém uma suíte de testes automatizados para validar fluxos principais de um e-commerce, incluindo:

- cadastro e login de usuário
- navegação por loja
- adição e remoção de itens no carrinho
- gerenciamento de wishlist
- checkout e pagamentos
- página Sobre Nós
- formulário de contato

A base de testes é configurada para acessar a aplicação em:

- https://automationpratice.com.br

## Stack utilizada

- Cypress 15
- TypeScript
- ESLint + Prettier
- Faker.js

## Estrutura do projeto

```text
cypress/
  e2e/
    pages/
      aboutUs.cy.ts
      contactUs.cy.ts
    shoppingCart/
      checkout.cy.ts
      detailsShopCart.cy.ts
      shoppingCart.cy.ts
    user/
      login.cy.ts
      logout.cy.ts
      registerUser.cy.ts
    wishlist/
      wishlist.cy.ts
  support/
    commands/
      pageCommands.ts
      shoppingCommands.ts
      userCommands.ts
    e2e.ts
    factories/
      user.ts
cypress.config.js
eslint.config.js
package.json
tsconfig.json
```

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- Node.js
- npm

## Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd QAzandoShop
```

2. Instale as dependências:

```bash
npm install
```

## Comandos disponíveis

### Abrir o Cypress em modo interativo

```bash
npm run cy:open
```

### Executar os testes em modo headless

```bash
npm run cy:run
```

### Rodar o lint

```bash
npm run lint
```

### Corrigir automaticamente problemas de lint

```bash
npm run lint:fix
```

## Como os testes estão organizados

A suíte está dividida por fluxos de negócio:

- `user/`: login, logout e cadastro
- `shoppingCart/`: carrinho, detalhes do carrinho e checkout
- `wishlist/`: integração com wishlist
- `pages/`: páginas institucionais como About Us e Contact Us

Os comandos customizados do Cypress estão organizados em `cypress/support/commands/`, com arquivos separados por responsabilidade, como `pageCommands.ts`, `shoppingCommands.ts` e `userCommands.ts`.

## CI com GitHub Actions

O projeto também possui uma pipeline de integração contínua em [.github/workflows/cypress.yml](.github/workflows/cypress.yml).

Essa workflow é acionada automaticamente em `push` e `pull_request`, e executa a suíte de testes em três navegadores:

- Chrome
- Firefox
- Edge

Durante a execução, a pipeline:

- faz o checkout do repositório
- instala o Node.js 22
- instala as dependências com `npm ci`
- executa os testes com `npm run cy:run -- --browser ${{ matrix.browser }}`
- envia os vídeos gerados como artefatos
- envia screenshots quando há falha

Essa configuração ajuda a garantir que o projeto continue validando seus fluxos em diferentes ambientes sempre que houver alteração no código.

## Observações importantes

- O arquivo `cypress.config.js` define a URL base da aplicação sob teste.
- Dados dinâmicos de usuário e endereço são gerados com Faker.

## Objetivo

Este repositório serve como base para validação automatizada de fluxos de e-commerce, com foco em comportamento do usuário, integração entre páginas e regras de negócio.

import * as orderFixture from '../fixtures/order.json';

/// <reference types='cypress' />

const testUrl = Cypress.config('baseUrl');
const ADD_TEXT = 'Добавить';
const BUN_INGREDIENT_TEXT = 'Краторная булка N-200i';
const INGREDIENTS_DETAILS_TEXT = 'Детали ингредиента';
const MODAL_SELECTOR = '[data-cy=modal]';

describe('тест сайта бургерной', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.viewport(1300, 800);

    if (testUrl) {
      cy.visit(testUrl);
    } else {
      throw new Error('baseUrl не определен в конфигурации Cypress');
    }
  });

  it('тест конструктора - добавление булок', () => {
    cy.get('[data-cy=bun-ingredients]').contains(ADD_TEXT).click();
    cy.get('[data-cy=constructor-bun]')
      .contains(BUN_INGREDIENT_TEXT)
      .should('exist');
    cy.get('[data-cy=constructor-bun]')
      .contains(BUN_INGREDIENT_TEXT)
      .should('exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});

describe('Тест модалки ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.viewport(1300, 800);

    if (testUrl) {
      cy.visit(testUrl);
    } else {
      throw new Error('baseUrl не определен в конфигурации Cypress');
    }
  });

  describe('Проверка модалок', () => {
    it('Тест на открытие по карточке ингредиента', () => {
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get(MODAL_SELECTOR).contains(BUN_INGREDIENT_TEXT).should('exist');
    });

    it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.reload(true);
      cy.get(MODAL_SELECTOR).children().should('have.length', 2);
    });
  });

  describe('Проверка закрытия модалок', () => {
    it('Через нажатие на крестик', () => {
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get(MODAL_SELECTOR).children().should('have.length', 2);
    });

    it('Через оверлей', () => {
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });
      cy.wait(500);
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
    });

    it('Через Escape', () => {
      cy.contains(BUN_INGREDIENT_TEXT).click();
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('exist');
      cy.get('body').type('{esc}');
      cy.wait(500);
      cy.contains(INGREDIENTS_DETAILS_TEXT).should('not.exist');
    });
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});

describe('тест на оформление заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('EXAMPLE_REFRESH_TOKEN')
    );

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    if (testUrl) {
      cy.visit(testUrl);
    } else {
      throw new Error('baseUrl не определен в конфигурации Cypress');
    }
  });

  it('Тест оформления заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains(ADD_TEXT).click();
    cy.get('[data-cy=order-sum]').click();

    cy.get('[data-cy=order-button]').click();

    cy.get(MODAL_SELECTOR).children().should('have.length', 2).as('modal');

    cy.get(MODAL_SELECTOR)
      .find('h2')
      .should('have.text', orderFixture.order.number);

    cy.get('[data-cy=modal-close-button]').click();

    cy.contains('Детали заказа').should('not.exist');

    cy.get('[data-cy=constructor]')
      .contains(BUN_INGREDIENT_TEXT)
      .should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});

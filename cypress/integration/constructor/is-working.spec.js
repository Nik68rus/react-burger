describe('burger constructor works correctly', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('token', 'rtoken');
  });

  after(() => {
    cy.clearCookies();
  });

  describe('Ingredient modal works correctly', () => {
    it('opens and closes ingredient modal', function () {
      cy.get('[class^=burger-ingredients_item__]').first().as('ingredient');
      cy.get('#react-modals').as('modalContainer');

      cy.get('@ingredient').click();
      cy.get('@modalContainer')
        .find('[class^=ingredient-details_details__]')
        .should('exist');
      cy.get('@modalContainer').find('[class^=modal_closeBtn__]').click();
      cy.get('@modalContainer')
        .find('[class^=ingredient-details_details__]')
        .should('not.exist');
    });
  });

  describe('authorization works correctly', () => {
    it('succesfully signing in', () => {
      cy.get('[class*=app-header_button__]').contains('Личный кабинет').click();
      cy.get('[class^=forms_login__]').then((loginForm) => {
        if (loginForm) {
          cy.get('input[type="email"]').type('nik200x@mail.ru');
          cy.get('input[type="password"]').type('12345');
          cy.get('button').contains('Войти').click();
        }
      });
      cy.contains('Профиль');
      cy.url().should('contain', '/profile');
    });
  });

  describe('burger constructor works correctly', () => {
    it('dragging bun to constructor and add it as a top and a bottom', () => {
      cy.get('[class*=app-header_button__]').contains('Конструктор').click();
      cy.get('[class^=burger-constructor_constructor__]').as('constructor');
      cy.get('[class^=burger-ingredients_tab-content__]')
        .find('h3')
        .contains('Булки')
        .next()
        .find('[class^=ingredient_ingredient__]')
        .first()
        .trigger('dragstart');
      cy.get('@constructor').trigger('drop');
      cy.get('@constructor')
        .find('[class^=burger-constructor_top__]')
        .should('exist');
      cy.get('@constructor')
        .find('[class^=burger-constructor_bottom__]')
        .should('exist');
    });

    it('should not be possible to send bun only order', () => {
      cy.get('[class^=burger-constructor_constructor__]').as('constructor');
      cy.get('@constructor').find('button').contains('Оформить заказ').click();
      cy.contains('Вы забыли выбрать начинку');
    });

    it('correctly drags not bun ingredients', () => {
      cy.get('[class^=burger-constructor_constructor__]').as('constructor');
      cy.get('[class^=burger-ingredients_tab-content__]')
        .find('h3')
        .contains('Начинки')
        .next()
        .find('[class^=ingredient_ingredient__]')
        .first()
        .trigger('dragstart');
      cy.get('@constructor').trigger('drop');
      cy.get('@constructor')
        .find('[class^=burger-constructor_content__]')
        .should('exist');
    });
  });

  describe('ordering works correctly', () => {
    it('sends order with bun and ingredient', () => {
      cy.get('[class^=burger-constructor_constructor__]').as('constructor');
      cy.get('@constructor')
        .find('button')
        .contains('Оформить заказ')
        .as('sendBtn');
      cy.get('@constructor').find('button').contains('Оформить заказ').click();
      cy.get('@sendBtn')
        .find('[class^=loader_wrapper_small__]')
        .should('exist');
    });

    it('finally renders order success popup', () => {
      cy.get('[class^=order-details_order-details__]', {
        timeout: 20000,
      }).contains('идентификатор заказа');
    });

    it('should be possible to close order popup', () => {
      cy.get('#react-modals')
        .find('[class^=modal_closeBtn__]')
        .click();
      cy.get('#react-modals')
        .find('[class^=ingredient-details_details__]')
        .should('not.exist');
    });

    it('clears burger constructor after succesfull order', () => {
      cy.get('[class^=burger-constructor_constructor__]')
        .find('[class*=burger-constructor_empty__]')
        .should('exist');
    });
  });
});

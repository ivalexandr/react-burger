import '@4tw/cypress-drag-drop'

describe('add and delete items to burgerConstructor', () => {
  before(() => {
    cy.viewport(1600, 800)
    cy.visit('/')
  })
  it('should add to burgerConstructor and remove to click', () => {
    cy.wait(1000)
    cy.get('[data-cy = "li-test"]').contains('Соус Spicy-X').drag('[data-cy="dnd-target"]')
    cy.wait(1000)
    cy.get('.constructor-element__action').click()
    cy.wait(1000)
  })
})
import '@4tw/cypress-drag-drop'

describe('add and delete items to burgerConstructor', () => {
  it('should add to burgerConstructor and remove to click', () => {
    cy.viewport(1600, 800)
    cy.visit('/')
    cy.wait(1000)
    cy.get('[data-cy="dnd-60c9dcba45f492002709027b"]').drag('[data-cy="dnd-target"]')
    cy.wait(1000)
    cy.get('.constructor-element__action').click()
  })
})
import '@4tw/cypress-drag-drop'

describe('drag-and-drop ingredients to burgerConstructor', () => {
  before(() => {
    cy.viewport(1600, 800)
    cy.visit('/')
  })
  it('should drag-and-drop event', () => {
    cy.wait(1000)
    cy.get('[data-cy = "li-test"]').contains('Краторная булка N-200i').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('[data-cy = "li-test"]').contains('Соус фирменный Space Sauce').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('[data-cy = "li-test"]').contains('Филе Люминесцентного тетраодонтимформа').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('[data-cy = "li-test"]').contains('Мини-салат Экзо-Плантаго').drag('[data-cy = "dnd-target"]')
  })
})
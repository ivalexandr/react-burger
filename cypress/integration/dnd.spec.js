import '@4tw/cypress-drag-drop'

describe('drag-and-drop ingredients to burgerConstructor', () => {
  before(() => {
    cy.viewport(1600, 800)
    cy.visit('/')
  })
  it('should drag-and-drop event', () => {
    cy.wait(1000)
    cy.get('li').contains('Краторная булка N-200i').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('li').contains('Соус фирменный Space Sauce').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('li').contains('Мини-салат Экзо-Плантаго').drag('[data-cy = "dnd-target"]')
  })
})
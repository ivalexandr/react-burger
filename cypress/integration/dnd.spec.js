import '@4tw/cypress-drag-drop'

describe('drag-and-drop ingredients to burgerConstructor', () => {
  it('should drag-and-drop event', () => {
    cy.viewport(1600, 800)
    cy.visit('/')
    cy.wait(1000)
    cy.get('[data-cy="dnd-60c9dcba45f4920027090275"]').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('[data-cy="dnd-60c9dcba45f492002709027b"]').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('[data-cy="dnd-60c9dcba45f492002709027a"]').drag('[data-cy = "dnd-target"]')
    cy.wait(500)
    cy.get('[data-cy="dnd-60c9dcba45f4920027090282"]').drag('[data-cy = "dnd-target"]')
  })
})
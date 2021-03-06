describe('is open modal-window on main screen', () => {
  before(() => {
    cy.viewport(1600, 800)
    cy.visit('/')
  })
  it('should be open modal-window on click ingredient', () => {
    cy.wait(1000)
    cy.get('[data-cy = "li-test"]').contains('Краторная булка N-200i').click()
    cy.wait(2000)
    cy.get('[data-cy="close"]').click()
  })
})
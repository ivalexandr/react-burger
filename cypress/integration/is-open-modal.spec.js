describe('is open modal-window on main screen', () => {
  it('should be open modal-window on click ingredient', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('li').contains('Краторная булка N-200i').click()
    cy.wait(2000)
    cy.get('[data-cy="close"]').click()
  })
})
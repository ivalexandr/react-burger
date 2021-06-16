describe('service is aviable', () => {
  it('should be run to localhost:3000', () => {
    cy.viewport(1600, 800)
    cy.visit('/')
  })
})
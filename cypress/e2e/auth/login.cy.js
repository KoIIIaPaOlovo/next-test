describe('Login', () => {
  before(() => {
    cy.resetDB()
  })

  it('should navigate to dashboard page after login', () => {
    cy.visit('/')

    cy.url().should('include', '/login')
 
    cy.get('input[name*="email"]').type(Cypress.env('ADMIN_EMAIL'))
 
    cy.get('input[name*="password"]').type(Cypress.env('ADMIN_PASSWORD'), { log: false })
 
    cy.get('button').click()

    cy.url().should('not.include', '/login')

  })
})
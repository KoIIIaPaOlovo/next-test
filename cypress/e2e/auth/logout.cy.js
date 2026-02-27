describe('Login', () => {
  before(() => {
    cy.resetDB()
  })
  beforeEach(() => {
    cy.session('standard-user', () => {
      cy.login()
    })
  })

  it('should navigate to login page whel logged out and redirect to login page if not authenticated', () => {
    cy.visit('/')
    cy.get('button[name*="sign-out-button"]').click()
    cy.url().should('not.include', '/login')
  })
})
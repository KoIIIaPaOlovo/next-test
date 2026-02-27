describe('Login wrong credentials', () => {
  it('should show proper error when failed log in (credentials issue)', () => {
    cy.visit('/')

    cy.url().should('include', '/login')
 
    cy.get('input[name*="email"]').type('-')
 
    cy.get('input[name*="password"]').type('-')
 
    cy.get('button').click()

    cy.get('.error-message').should('have.text', 'Invalid credentials.')
    
    cy.url().should('include', '/login')
  })
})
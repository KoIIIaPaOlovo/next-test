describe('Login wrong credentials', () => {
  it('should show proper error when failed log in (credentials issue)', () => {
    cy.visit('/')

    cy.url().should('include', '/login')
 
    cy.get('input[name*="email"]').type('test')
 
    cy.get('input[name*="password"]').type('test')
 
    cy.get('button').click()

    cy.get('.error-message').should('have.text', 'Invalid credentials.')
    
    cy.url().should('include', '/login')
  })
})
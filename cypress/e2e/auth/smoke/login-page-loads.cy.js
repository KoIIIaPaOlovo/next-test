describe('Login page smoke test', { tags: ['@smoke', '@ultra-smoke'] }, () => {
  before(() => {
    cy.resetDB()
  })
  beforeEach(() => {
    cy.visit('/login');
  });

  it('loads essential structure without crashing', () => {
    cy.url().should('include', '/login');
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[name="submit-form"]').should('be.visible');
    
    cy.get('h1').should('have.text','Please log in to continue.');
  });
});
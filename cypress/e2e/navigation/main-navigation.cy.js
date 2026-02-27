describe('Navigation test', () => {
    beforeEach(() => {
        cy.session('standard-user', () => {
            cy.login()
        })
    })

    it('navigates to invoices -> customers -> dashboard pages', () => { 
        cy.visit('/dashboard')

        cy.get('a').contains('p', 'Invoices').click()
        cy.url().should('include', '/invoices')
        cy.contains('h1', 'Invoices')

        cy.get('a').contains('p', 'Customers').click()
        cy.url().should('include', '/customers')
        cy.contains('h1', 'Customers')

        cy.get('a').contains('p', 'Home').click()
        cy.url().should('include', '/dashboard')
        cy.contains('h1', 'Dashboard')
    })
})
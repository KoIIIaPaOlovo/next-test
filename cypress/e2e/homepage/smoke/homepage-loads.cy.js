describe('Homepage smoke', () => {
    before(() => {
        cy.resetDB()
    })
    beforeEach(() => {
        cy.session('standard-user', () => {
            cy.login()
        })
        cy.visit('/dashboard')
    })

    it('shows dashboard titles', () => { 
        cy.contains('h1', 'Dashboard')
        cy.contains('h2', 'Recent Revenue')
        cy.contains('h2', 'Latest Invoices')
    })
})
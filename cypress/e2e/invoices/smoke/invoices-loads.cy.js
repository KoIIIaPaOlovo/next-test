describe('Invoices smoke', () => {
    before(() => {
        cy.resetDB()
    })
    beforeEach(() => {
        cy.session('standard-user', () => {
            cy.login()
        })
        cy.visit('/invoices')
    })

    it('shows invoices titles', () => { 
        cy.contains('h1', 'Invoices')
        cy.contains('span', 'Create Invoice')
        cy.contains('p', 'testname1')

        cy.find('button').contains('Create Invoice').click();

        cy.url().should('include', '/invoices/create')

        cy.find('button').contains('Cancel').click();

        cy.url().should('include', '/invoices')
        cy.url().should('not.include', '/invoices/create')
    })
})
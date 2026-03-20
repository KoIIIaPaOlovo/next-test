describe('Edit invoice flow', () => {
    before(() => {
        cy.resetDB()
    })
    beforeEach(() => {
        cy.session('standard-user', () => {
            cy.login()
        })
    })

    it('invoice editing', () => { 
        cy.visit('/dashboard/invoices')

        cy.get('input[placeholder="Search..."]').type('testname2');

        cy.url().should('include', 'query=testname2')

        cy.contains('tr td', 'testemail2')
        .closest('tr')
        .find('a[href*="/dashboard/invoices/update/"]').click();

        cy.url().should('include', '/invoices/update')

        cy.contains('a', 'Edit Invoice');
        cy.get('input[name*="amount"]').clear();
        cy.get('input[name*="amount"]').type('1000');
        cy.contains('label', 'Paid').click();
        cy.contains('button', 'Edit Invoice').click();

        cy.get('input[placeholder="Search..."]').type('testname2');

        cy.url().should('include', 'query=testname2')

        cy.contains('tr td', '$1,000.00')
        .closest('tr')
        .find('span').contains('Paid')
    })
})
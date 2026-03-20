describe('Create invoices flow', () => {
    before(() => {
        cy.resetDB()
    })
    beforeEach(() => {
        cy.session('standard-user', () => {
            cy.login()
        })
    })

    it('invoice adding flow (pending)', () => { 
        cy.visit('/dashboard/invoices')
        cy.contains('a', 'Create Invoice').click();
        cy.url().should('include', '/invoices/create')

        cy.get('select[name*="customerId"]').select('testname3'); 
        cy.get('input[name*="amount"]').type('888');
        cy.contains('label', 'Pending').click();
        cy.contains('button', 'Create Invoice').click();

        cy.get('input[placeholder="Search..."]').type('testname3');

        cy.contains('tr td', '$888.00')
        .closest('tr')
        .find('span').contains('Pending')
        .closest('tr')
        .find('p').contains('testname3');
    })

    it('invoice adding flow (paid)', () => { 
        cy.visit('/dashboard/invoices')
        cy.contains('a', 'Create Invoice').click();
        cy.url().should('include', '/invoices/create')

        cy.get('select[name*="customerId"]').select('testname3'); 
        cy.get('input[name*="amount"]').type('777');
        cy.contains('label', 'Paid').click();
        cy.contains('button', 'Create Invoice').click();

        cy.get('input[placeholder="Search..."]').type('testname3');

        cy.contains('tr td', '$777.00')
        .closest('tr')
        .find('span').contains('Paid')
        .closest('tr')
        .find('p').contains('testname3');
    })
})
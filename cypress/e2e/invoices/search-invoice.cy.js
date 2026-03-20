describe('Edit invoice flow', () => {
    before(() => {
        cy.resetDB()
    })
    beforeEach(() => {
        cy.session('standard-user', () => {
            cy.login()
        })
    })

    it('invoice searching', () => { 
        cy.visit('/dashboard/invoices')

        cy.get('input[placeholder="Search..."]').type('testname1');

        cy.url().should('include', 'query=testname1')

        cy.contains('td', 'testemail1');
        cy.contains('td', 'testemail2').should('not.exist');
        cy.contains('td', 'testemail3').should('not.exist');

        cy.get('input[placeholder="Search..."]').clear()
        cy.get('input[placeholder="Search..."]').type('testname2');

        cy.url().should('include', 'query=testname2')

        cy.contains('td', 'testemail2');
        cy.contains('td', 'testemail1').should('not.exist');
        cy.contains('td', 'testemail3').should('not.exist');


        cy.get('input[placeholder="Search..."]').clear()
        cy.get('input[placeholder="Search..."]').type('testname3');

        cy.url().should('include', 'query=testname3')

        cy.contains('td', 'testemail3');
        cy.contains('td', 'testemail1').should('not.exist');
        cy.contains('td', 'testemail1').should('not.exist');
    })
})
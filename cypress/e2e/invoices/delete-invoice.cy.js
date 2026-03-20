describe('Delete invoices flow', () => {
    before(() => {
        cy.resetDB()
    })
    beforeEach(() => {
        cy.session('standard-user', () => {
            cy.login()
        })
        cy.visit('/invoices')
    })

    it('properly removes invoice record', () => { 
        cy.contains('tr p', 'testname3')
        .closest('tr')
        .find('button').contains('Delete').click();

        cy.contains('tr p', 'testname3').should('not.exist');
    })
})
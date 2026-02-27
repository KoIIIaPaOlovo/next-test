describe('Homepage widgets', () => {
    beforeEach(() => {
        cy.resetDB().then(() => {
            cy.session('standard-user', () => {
                cy.login()
            })
            cy.visit('/dashboard')
        })
    })

    it('displays correct dashboard widgets', () => { 
        cy.contains('h1', 'Dashboard')

        const collectedWidget = cy.get("div[id*='widget-card-collected']")
        const pendingWidget = cy.get("div[id*='widget-card-pending']")
        const invoicesWidget = cy.get("div[id*='widget-card-invoices']")
        const customersWidget = cy.get("div[id*='widget-card-customers']")

        collectedWidget.within(() => {
            cy.contains('h3', 'Collected')
            cy.contains('$40.00').should('be.visible')
        })

        pendingWidget.within(() => {
            cy.contains('h3', 'Pending')
            cy.contains('$25.00').should('be.visible')
        })

        invoicesWidget.within(() => {
            cy.contains('h3', 'Total Invoices')
            cy.contains('8').should('be.visible')
        })
        
        customersWidget.within(() => {
            cy.contains('h3', 'Total Customers')
            cy.contains('3').should('be.visible')
        })


        cy.contains('h2', 'Recent Revenue')
        const revenueWidget = cy.get("div[id*='revenue-chart']")

        revenueWidget.within(() => {
            cy.contains('p', '$2K')
            cy.contains('p', 'Jan')
            cy.contains('p', 'Feb')
        })

        cy.contains('h2', 'Latest Invoices')

        const latestInvoicesWidget = cy.get("div[id*='latest-invoices-chart']")

        latestInvoicesWidget.within(() => {
            cy.get('p:contains("testname2")').should('have.length', 1)
            cy.get('p:contains("testname1")').should('have.length', 3)
            cy.get('p:contains("testname3")').should('have.length', 1)

            cy.get('p:contains("testemail2")').should('have.length', 1)
            cy.get('p:contains("testemail1")').should('have.length', 3)
            cy.get('p:contains("testemail3")').should('have.length', 1)

            cy.get('p:contains("$10.00")').should('have.length', 3)
            cy.get('p:contains("$5.00")').should('have.length', 2)
        })
    })
})
// cypress/support/page-objects/base-page.js
export default class BasePage {
    constructor() {
        this.selectors = {
            pageTitle: 'h1',
            pageContainer: 'body'
        }
    }

    visit(url) {
        // Fix the visit method to properly handle URLs
        return cy.visit(url, {
            timeout: 60000,
            failOnStatusCode: false
        })
    }
}
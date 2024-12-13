// cypress/support/page-objects/base.page.js
export default class BasePage {
    constructor() {
        this.selectors = {
            pageTitle: 'h1',
            pageContainer: 'body'
        }
    }

    visit(path) {
        cy.visit(path, {
            timeout: 60000,
            failOnStatusCode: false
        })
    }

    getElement(selector, options = { timeout: 10000 }) {
        return cy.get(selector, options)
    }
}
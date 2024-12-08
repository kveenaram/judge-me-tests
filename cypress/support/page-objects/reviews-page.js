// cypress/support/page-objects/reviews-page.js
import BasePage from './base-page'

class ReviewsPage extends BasePage {
    constructor() {
        super()
        // Use configuration instead of hardcoded URL
        this.url = Cypress.env('reviewsPath')
        this.selectors = {
            ...this.selectors,
            searchInput: '#search-input',
            reviewsContainer: '.reviews-container',
            reviewItem: '.review-item',
            searchSuggestions: '.dropdown',
            searchResults: '.search-results',      // Container for results
            pageTitle: 'h1'
        }
    }

    visit() {
        super.visit(this.url)
        this.verifyPageLoaded()
        return this
    }

    verifyPageLoaded() {
        cy.contains('Discover trusted products', { timeout: 10000 })
            .should('be.visible')
        return this
    }

    typeSearch(searchTerm) {
        cy.get('body').then($body => {
            cy.log('Available search inputs:', $body.find('input').length)
        })

         cy.get(this.selectors.searchInput, { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type(searchTerm, { delay: 100 })
        return this
    }

    submitSearch() {
        cy.get(this.selectors.searchInput).type('{enter}')
        return this
    }

    search(searchTerm) {
        return this
            .typeSearch(searchTerm)
            .submitSearch()
    }

    verifySearchResults(searchTerm) {
        cy.url().should('include', `q=${searchTerm}`)
    }

    verifySpaceSearchResults(searchTerm) {
        const encodedTerm = encodeURIComponent(searchTerm)
        cy.url().should('include', `q=${encodedTerm}`)
    }

    verifyTrimmedSearchResults(searchTerm) {
        const trimmedTerm = searchTerm.trim();
        const encodedTrimmedTerm = encodeURIComponent(trimmedTerm);

        cy.url().then((url) => {
            const normalizedUrl = url.replace(/%20/g, '').trim();
            cy.log('Normalized URL:', normalizedUrl);
            expect(normalizedUrl).to.include(`search?q=${encodedTrimmedTerm}`);
        });
    }

    verifyNoResults(searchTerm) {
        cy.contains(`0 results found for "${searchTerm}"`).should('be.visible')
    }

    getSearchSuggestions() {
        return cy.get(this.selectors.searchSuggestions, { timeout: 10000 })
            .should('be.visible')
    }

    clickSearchSuggestion(index = 0) {
        this.getSearchSuggestions()
            .find(this.selectors.searchSuggestions)
            .eq(index)
            .click()
        return this
    }
}

export default new ReviewsPage()
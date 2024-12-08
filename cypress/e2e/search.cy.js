// cypress/e2e/smoke.cy.js
import ReviewsPage from '../support/page-objects/reviews-page'

describe('Judge.me Reviews - Smoke Tests', () => {
    beforeEach(() => {
        ReviewsPage.visit()
    })

    describe('Basic Search Functionality', () => {
        it('performs basic product search', () => {
            const searchTerm = 'shirt'

            cy.get(ReviewsPage.selectors.searchInput)
                .should('be.visible')
                .and('be.enabled')

            ReviewsPage.search(searchTerm)
            ReviewsPage.verifySearchResults(searchTerm)
        })

        it('handles special characters in search', () => {
            const specialChars = '!!'
            ReviewsPage.search(specialChars)
            ReviewsPage.verifyNoResults(specialChars)
        })
    })

    describe('Search Suggestions', () => {
        it('shows search suggestions while typing', () => {
            const partialTerm = 'shi'
            ReviewsPage.typeSearch(partialTerm)
            ReviewsPage.getSearchSuggestions().should('be.visible').and('not.be.empty')
        })
    })

    describe('Search Input Validation', () => {
        it('handles long search terms', () => {
            const longSearchTerm = 'a'.repeat(50)
            ReviewsPage.search(longSearchTerm)
            ReviewsPage.verifyNoResults(longSearchTerm)
        })

        it('handles spaces in search terms', () => {
            const termWithSpaces = 'blue shirt'
            ReviewsPage.search(termWithSpaces)
            ReviewsPage.verifySpaceSearchResults(termWithSpaces)
        })

        it('trims whitespace from search terms', () => {
            const untrimmedTerm = '  shirt  '
            ReviewsPage.search(untrimmedTerm)
            ReviewsPage.verifyTrimmedSearchResults(untrimmedTerm)
        })
    })

    describe('Edge Cases', () => {
        it('handles empty search input', () => {
            ReviewsPage.search('{enter}')
            ReviewsPage.verifyPageLoaded()
        })

        it('maintains search term after page refresh', () => {
            const searchTerm = 'shirt'
            ReviewsPage.search(searchTerm)
            cy.reload()
            ReviewsPage.verifySearchResults(searchTerm)
        })

    })
})
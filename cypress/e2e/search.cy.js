// cypress/e2e/search.cy.js
import SearchPage from '../support/page-objects/search-page';

describe('Judge.me Reviews - Search Tests', () => {
    beforeEach(() => {
        SearchPage.visit()
    })

    describe('Basic Search Functionality', () => {
        it('performs basic product search', () => {
            const searchTerm = 'shirt'

            cy.get(SearchPage.selectors.searchInput)
                .should('be.visible')
                .and('be.enabled')

            SearchPage.search(searchTerm)
            SearchPage.verifySearchResults(searchTerm)
        })

        it('handles special characters in search', () => {
            const specialChars = '!!'
            SearchPage.search(specialChars)
            SearchPage.verifyNoResults(specialChars)
        })
    })

    describe('Search Suggestions', () => {
        it('shows search suggestions while typing', () => {
            const partialTerm = 'shi'
            SearchPage.typeSearch(partialTerm)
            SearchPage.getSearchSuggestions().should('be.visible').and('not.be.empty')
        })
    })

    describe('Search Input Validation', () => {
        it('handles long search terms', () => {
            const longSearchTerm = 'a'.repeat(50)
            SearchPage.search(longSearchTerm)
            SearchPage.verifyNoResults(longSearchTerm)
        })

        it('handles spaces in search terms', () => {
            const termWithSpaces = 'blue shirt'
            SearchPage.search(termWithSpaces)
            SearchPage.verifySpaceSearchResults(termWithSpaces)
        })

        it('trims whitespace from search terms', () => {
            const untrimmedTerm = '  shirt  '
            SearchPage.search(untrimmedTerm)
            SearchPage.verifyTrimmedSearchResults(untrimmedTerm)
        })
    })

    describe('Edge Cases', () => {
        it('handles empty search input', () => {
            SearchPage.search('{enter}')
            SearchPage.verifyPageLoaded()
        })

        it('maintains search term after page refresh', () => {
            const searchTerm = 'shirt'
            SearchPage.search(searchTerm)
            cy.reload()
            SearchPage.verifySearchResults(searchTerm)
        })

    })
})
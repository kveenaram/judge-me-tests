// cypress/e2e/filters.cy.js
import FiltersPage from '../support/page-objects/filters.page'

describe('Product Filters in Search Page', () => {
    beforeEach(() => {
        cy.visit('/search?q=shoes')
        FiltersPage.waitForResults()
    })

    describe('Results Display', () => {
        it('displays results count greater than zero\'', () => {
            FiltersPage
                .verifyResultsCountGreaterThanZero()
                .verifyResultsText('shoes')
        })
    })

    describe('Category Selection', () => {
        it('filters products by Baby category', () => {
            FiltersPage
                .selectBabyCategory()
                .verifyCategoryPillExists('Baby')
                .verifyResultsSummaryUpdated('Baby')
        })

        it('removes category filter when clicking pill', () => {
            FiltersPage
                .selectBabyCategory()
                .verifyCategoryPillExists('Baby')
                .removeCategoryFilter()
                .verifyResultsText('shoes')
        })

        it('updates URL when selecting category', () => {
            FiltersPage
                .selectBabyCategory()
                .verifyCategoryPillExists('Baby')
            cy.url().should('include', 'category_id=')
        })
    })

    describe('Currency and Country Selection', () => {
         it('changes currency to GBP', () => {
            FiltersPage
                .selectCurrency('GBP')
                .verifyCurrencySelection('GBP')
         })

        it('maintains currency after page reload', () => {
              FiltersPage.selectCurrency('GBP')
            cy.reload()
              FiltersPage.verifyCurrencySelection('GBP')
        })

        it('changes store country selection', () => {
            FiltersPage
                .selectStoreCountry('GB')
                .verifyStoreCountrySelection('GB')
        })

        it('changes ship country selection', () => {
            FiltersPage
                .selectShippingCountry('GB')
                .verifyShipCountrySelection('GB')
        })
    })
    
})
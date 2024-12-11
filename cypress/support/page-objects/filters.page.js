// cypress/support/page-objects/filters.page.js
import BasePage from './base-page'

class FiltersPage extends BasePage {
    elements = {
        resultsSummary: () => cy.get('[data-v-1549eec6].search-results__summary'),
        searchResults: () => cy.get('[data-v-1549eec6].search-results__list'),
        searchResultsSummary: () => cy.get('[data-v-1549eec6].search-results__summary'),
        categoryPill: () => cy.get('[data-v-ed449272].removable-pill.search-results__summary-category-pill'),
        categoryWrapper: () => cy.get('[data-v-1549eec6].search-results__summary-category-wrapper'),
        removePillButton: () => cy.get('[data-v-ed449272].removable-pill__remove-icon.material-icons'),
        currencySelect: () =>  cy.get('[data-v-baa43182].currency-dropdown__select').eq(0).select('GBP', { force: true }),
        storeCountrySelect: () => cy.get('.country-dropdown__select'),
        shipCountrySelect: () => cy.get('.country-dropdown__select-padding-flag'),
        babyCategory: () => cy.contains('Baby'),
        searchResultsCount: () => cy.get('.search-results__result-heading'),
        productCard: () => cy.get('.product-search-card.search-result-card'),
    }

    selectFirstProduct() {
        this.elements.productCard().first().click();
        return this;
    }

    verifyResultsCountGreaterThanZero() {
        this.elements.searchResultsCount().should('have.length.greaterThan', 0);
        return this;
    }

    selectBabyCategory() {
        this.elements.babyCategory().click()
        return this
    }

    selectStoreCountry(country) {
        this.elements.storeCountrySelect()
            .eq(0)
            .should('exist')
            .select(country, { force: true });
        return this;
    }

    verifyStoreCountrySelection(country) {
        this.elements.storeCountrySelect().eq(0).should('have.value', 'GB');
    }

    selectShippingCountry(country) {
        // Ensure the dropdown exists and is visible
        this.elements.shipCountrySelect().should('exist').should('be.visible')
            .select(country, { force: true });
        return this;
    }

    verifyShipCountrySelection(country) {
        this.elements.shipCountrySelect().eq(0).should('have.value', 'GB');
    }


    selectCurrency(currency) {
        this.elements.currencySelect().should('exist').eq(0).select(currency, { force: true });
        this.verifyCurrencySelection(currency);
        return this;
    }

    verifyCurrencySelection(currency) {
        this.elements.currencySelect()
            .should('have.value', currency);
    }

    verifyCategoryPillExists(category) {
        this.elements.categoryPill()
            .should('be.visible')
            .and('contain', category)

        this.elements.removePillButton()
            .should('be.visible')
            .and('contain', 'cancel')

        return this
    }

    verifyResultsSummaryUpdated(category) {
        this.elements.resultsSummary()
            .should('be.visible')
            .within(() => {
                this.elements.categoryWrapper().should('be.visible').and('contain', 'in')
                this.elements.categoryPill().should('be.visible').and('contain', category)
            })
        return this
    }

    removeCategoryFilter() {
        // Click the remove button
        this.elements.removePillButton()
            .should('be.visible')
            .and('contain', 'cancel')
            .click()
        // Verify pill is removed
        this.elements.categoryPill()
            .should('not.exist')
        return this
    }

    waitForResults() {
        cy.get('[data-v-1549eec6].search-results__list', { timeout: 10000 })
            .should('be.visible')
        cy.get('[data-v-1549eec6].search-results__summary', { timeout: 10000 })
            .should('be.visible')
        return this
    }

    verifyResultsText(searchTerm) {
        this.waitForResults()
        this.elements.searchResultsSummary().should('contain', searchTerm).and('contain', 'results found for')
        return this
    }
}

export default new FiltersPage()
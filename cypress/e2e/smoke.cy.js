// cypress/e2e/smoke.cy.js
import SearchPage from '../support/page-objects/search-page'

describe('Judge.me Reviews - Smoke Tests', () => {
    beforeEach(() => {
        SearchPage.visit()
    })

    it('loads the reviews page successfully', () => {
        SearchPage.verifyPageLoaded()
    })

})
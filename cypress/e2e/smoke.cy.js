// cypress/e2e/smoke.cy.js
import ReviewsPage from '../support/page-objects/reviews-page'

describe('Judge.me Reviews - Smoke Tests', () => {
    beforeEach(() => {
        ReviewsPage.visit()
    })

    it('loads the reviews page successfully', () => {
        ReviewsPage.verifyPageLoaded()
    })

})
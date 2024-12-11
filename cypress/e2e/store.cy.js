// cypress/e2e/filters.cy.js

import FiltersPage from "../support/page-objects/filters.page";
import StorePage from "../support/page-objects/store-page";

describe('Write a review for the searched product', () => {
    beforeEach(() => {
        cy.visit('/search?q=shoes')
        FiltersPage.waitForResults()
        FiltersPage.selectFirstProduct()
    })

    it('store page displayed for the selected product', () => {
        StorePage.storePageDisplayed().should('exist');
    })

    it('select to write a review for the product ', () => {
        StorePage.selectWriteReviewOpton();
        StorePage.elements.reviewTitle().should('exist');

        // Fill in the review form
        const reviewTitle = 'Amazing Shoes!';
        const reviewContent = 'These shoes are comfortable, stylish, and affordable. Highly recommend!';
        const name = 'John';
        const email = 'test@example.com';
        StorePage.fillReviewForm(reviewTitle, reviewContent, email, name);
        StorePage.submitReview();
    })

})
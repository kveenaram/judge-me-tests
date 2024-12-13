// cypress/support/page-objects/product.page.js
import BasePage from './base-page'

class StorePage extends BasePage {
    elements = {
        storePage: () => cy.get('.store-page'),
        writeReviewOption: () => cy.get('.store-page__view-reviews-button'),
        reviewTitle: () => cy.get('input#review-title.review-form__form-input-text.border-round'),
        writeReviewContent: () => cy.get('#review-body.review-form__form-input-text.review-form__form-input-textarea'),
        reviewEmail: () => cy.get('input.review-form__form-input-text[name="email"]'),
        reviewDisplayName: () => cy.get('input.review-form__form-input-text[name="name"]'),
        reviewSubmit: () => cy.get('input.btn.pf-secondary-button.review-form__cta-buttons.review-form__submit-review[type="submit"]'),

        // reviewSuccess: () => cy.get('.review-form__submitted')
        reviewSuccessMessage: () => cy.get('.review-form__submitted-notification'),
    }

    storePageDisplayed() {
        return cy.get('.store-page');
    }

    selectWriteReviewOpton() {
        this.elements.writeReviewOption().click();
        return this;
    }

    fillReviewForm(title, content, email, name) {
        this.elements.reviewTitle().type(title);
        this.elements.writeReviewContent().type(content);
        this.elements.reviewEmail().type(email);
        this.elements.reviewDisplayName().type(name);
        return this;
    }

    submitReview() {
        cy.wait(20)
        this.elements.reviewSubmit().click();
        return this;
    }

    verifyReviewSubmissionSuccess() {
        this.elements.reviewSuccessMessage().should('contain.text', 'Review Submitted!');
        return this;
    }
}
export default new StorePage()
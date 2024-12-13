// cypress/e2e/product-reviews.cy.js
import ProductReviewsPage from '../support/page-objects/product-reviews-page'

describe('Product Reviews', () => {
    beforeEach(() => {
        cy.visit('/search?q=shoes')
    })

    it('displays product cards with correct structure', () => {
        ProductReviewsPage.verifyProductCard()
    })

    it('shows product details correctly', () => {
        cy.get(ProductReviewsPage.selectors.productCard)
            .first()
            .within(() => {
                // Verify product name
                cy.get(ProductReviewsPage.selectors.productName)
                    .should('be.visible')
                    .and('not.be.empty')

                // Verify shop name
                cy.get(ProductReviewsPage.selectors.shopName)
                    .should('be.visible')
                    .and('not.be.empty')

                // Verify product image
                cy.get(ProductReviewsPage.selectors.productImage)
                    .should('be.visible')
                    .find('img')
                    .should('have.attr', 'src')
            })
    })
})
// cypress/support/page-objects/product-reviews.page.js
import BasePage from './base-page'

class ProductReviewsPage extends BasePage {
    constructor() {
        super()
        this.url = Cypress.env('reviewsPath')
        this.selectors = {
            productCard: '.product-search-card.search-result-card',
            productName: '[data-v-4c3b25ba].product-search-card__title',
            ratingSection: '[data-v-4c3b25ba].product-search-card__review-badge-rating-section',
            productRating: '[data-v-4c3b25ba].product-search-card__review-badge--rating',
            reviewCount: '.product-search-card__review-badge-reviews-count-section',
            productPrice: '[data-v-4c3b25ba].product-search-card__price',
            // Shop name selectors
            shopNameOverlay: '[data-v-4c3b25ba].product-search-card__shop-name-overlay',
            shopName: '[data-v-4c3b25ba].product-search-card__shop-name',
            // Product image selectors
            productImageWrapper: '[data-v-4c3b25ba].product-search-card__product-image-wrapper',
            productImage: '[data-v-4c3b25ba].product-search-card__product-image',
        }
    }

    verifyProductCard() {
        return cy.get(this.selectors.productCard)
            .first()
            .within(() => {
                // Verify product image
                cy.get(this.selectors.productImage)
                    .should('exist')
                    .and('be.visible')

                // Verify shop name
                cy.get(this.selectors.shopName)
                    .should('exist').and('not.be.empty')
            })
    }
}

export default new ProductReviewsPage()
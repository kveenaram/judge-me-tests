// cypress/support/page-objects/home-page.js
class HomePage {
    navigate() {
        cy.visit('https://judge.me/reviews');
    }

    getTitle() {
        return cy.title();
    }

    clickCategoryLink(category) {
        const categoryMapping = {
            'Apparel & Accessories': '/categories/apparel-accessories',
            'Animals & Pet Supplies': '/categories/animals-pet-supplies',
            'Health & Beauty': '/categories/health-beauty',
            'Home & Garden': '/categories/home-garden',
            'Electronics': '/categories/electronics',
            'Furniture': '/categories/furniture',
            'Sporting Goods': '/categories/sporting-goods',
        };
        cy.get(`a.meganav__header-link[href="${categoryMapping[category]}"]`).click();
    }

    performSearch(query) {
        cy.get('input[placeholder="Search products"]').type(`${query}{enter}`);
    }

    getSearchResults() {
        return cy.get('.search-results');
    }

    clickSignInButton() {
        cy.get('a.pf-secondary-button.main-header__user-sign-in').click();
    }
}

export default new HomePage()


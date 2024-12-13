// cypress/e2e/homepage.cy.js
import HomePage from '../support/page-objects/home-page';

describe('Homepage Load and Navigation', () => {
    beforeEach(() => {
        HomePage.navigate();
    });

    it('should load the homepage', () => {
        HomePage.getTitle().should('include', 'Judge.me');
    });

    it('should navigate to Apparel & Accessories category', () => {
        HomePage.clickCategoryLink('Apparel & Accessories');
        cy.url().should('include', 'apparel-accessories');
    });

    it('should navigate to Animals & Pet Supplies category', () => {
        HomePage.clickCategoryLink('Animals & Pet Supplies');
        cy.url().should('include', 'animals-pet-supplies');
    });

    it('should navigate to Health & Beauty category', () => {
        HomePage.clickCategoryLink('Health & Beauty');
        cy.url().should('include', 'health-beauty');
    });

    it('should navigate to Home & Garden category', () => {
        HomePage.clickCategoryLink('Home & Garden');
        cy.url().should('include', 'home-garden');
    });

    it('should navigate to Electronics category', () => {
        HomePage.clickCategoryLink('Electronics');
        cy.url().should('include', 'electronics');
    });

    it('should navigate to Furniture category', () => {
        HomePage.clickCategoryLink('Furniture');
        cy.url().should('include', 'furniture');
    });

    it('should perform a search and display results', () => {
        HomePage.performSearch('shoes');
        HomePage.getSearchResults().should('exist');
    });

    it('should navigate to the sign-in page', () => {
        HomePage.clickSignInButton();
        cy.url().should('include', 'login');
    });
});
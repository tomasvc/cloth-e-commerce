/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'New items');
  })

  it('should navigate to the products page on main button click', () => {
    cy.visit('http://localhost:3000');
    cy.contains('button', 'Browse store').click();
    cy.url().should('include', '/products/27110');
    cy.get('h1').should('contain', 'New in');
  })

  it('should navigate to a product by pressing on it in the products list', () => {
    cy.visit('http://localhost:3000/products/27110');
    cy.get('h1').should('contain', 'New in');

    cy.get('ul').find('li').first().click();
    cy.get('#product-name').should('exist').and('be.visible');
  })
})
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

  // it('should render all available menu options', () => {
  //   cy.request('https://asos10.p.rapidapi.com/api/v1/getCategories?country=US&lang=en-US', {
  //     headers: {
  //       'X-RapidAPI-Key': '78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0',
  //       'X-RapidAPI-Host': 'asos10.p.rapidapi.com'
  //     }
  //   }).then((response) => {
  //     console.log(response)
  //   })
  // })

  it('should navigate to a product by pressing on it in the products list', () => {
    cy.visit('http://localhost:3000/products/27110');
    cy.get('h1').should('contain', 'New in');

    cy.get('ul').find('li').first().click();
    cy.get('#product-name').should('exist').and('be.visible');
  })
})
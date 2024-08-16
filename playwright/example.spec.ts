import { test, expect } from '@playwright/test';

test('Verify product details', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Click on a product
    await page.click('.product');
    
    // Verify product details
    const productName = await page.textContent('.product-name');
    const productPrice = await page.textContent('.product-price');
    
    expect(productName).toBe('Example Product');
    expect(productPrice).toBe('$19.99');
});

test('Add product to cart', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Click on a product
    await page.click('.product');
    
    // Click on "Add to Cart" button
    await page.click('.add-to-cart-button');
    
    // Verify success message
    const successMessage = await page.textContent('.success-message');
    expect(successMessage).toBe('Product added to cart successfully.');
    
    // Verify cart count
    const cartCount = await page.textContent('.cart-count');
    expect(cartCount).toBe('1');
});
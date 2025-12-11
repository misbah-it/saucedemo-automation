import { test, expect } from '@playwright/test';

test('Complete purchase flow on SauceDemo', async ({ page }) => {
  // 1. OPEN LOGIN PAGE
  await page.goto('https://www.saucedemo.com/');
  // Verify homepage loaded
  await expect(page.getByText('Swag Labs')).toBeVisible();

  // 2. LOGIN MODULE
  const usernameInput = page.locator('[data-test="username"]'); // Locator for username input
  await usernameInput.fill('standard_user'); // Action: Fill username

  const passwordInput = page.locator('[data-test="password"]'); // Locator for password input
  await passwordInput.fill('secret_sauce'); // Action: Fill password

  const loginButton = page.locator('[data-test="login-button"]'); // Locator for login button
  await loginButton.click(); // Action: Click login button

  const pageTitle = page.locator('.title'); // Locator for page title
  await expect(pageTitle).toHaveText('Products'); // Assertion: Verify products page is displayed

  // 3. ADD FIRST PRODUCT TO CART
  const firstProduct = page.locator('[data-test="inventory-item-name"]').first(); // Locator for first product
  await expect(firstProduct).toBeVisible(); // Assertion: Product is visible
  await firstProduct.click(); // Action: Open product detail page

  await page.getByRole('button', { name: 'Add to cart' }).click(); // Action: Add first product to cart

  // Go to cart
  await page.locator('.shopping_cart_link').click(); // Action: Open cart

  // 4. CONTINUE SHOPPING
  await page.getByRole('button', { name: 'Continue Shopping' }).click(); // Action: Return to products page

  // Sort products (Z → A)
  await page.locator('[data-test="product-sort-container"]').selectOption('za'); // Action: Apply sort filter

  // Add another product
  await page.getByText('Test.allTheThings() T-Shirt (Red)').click(); // Action: Open second product
  await page.getByRole('button', { name: 'Add to cart' }).click(); // Action: Add second product to cart

  // Open cart again
  await page.locator('[data-test="shopping-cart-link"]').click(); // Action: Open cart

  // 5. CHECKOUT PROCESS
  await page.getByRole('button', { name: 'Checkout' }).click(); // Action: Start checkout

  // Fill checkout information
  await page.locator('#first-name').fill('Shelley'); // Action: Fill first name
  await page.getByPlaceholder('Last Name').fill('Adrien'); // Action: Fill last name
  await page.getByPlaceholder('Zip/Postal Code').fill('50420'); // Action: Fill postal code

  // Continue to overview
  await page.getByRole('button', { name: 'Continue' }).click(); // Action: Proceed to overview

  // Finish purchase
  await page.getByRole('button', { name: 'Finish' }).click(); // Action: Complete order

  // 6. BACK TO HOME
  await page.getByRole('button', { name: 'Back Home' }).click(); // Action: Return to products page
});

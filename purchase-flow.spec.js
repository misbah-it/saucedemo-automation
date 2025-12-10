import { test, expect } from '@playwright/test';

test('Complete purchase flow on SauceDemo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  // LOGIN MODULE
  const usernameInput = page.locator('[data-test="username"]'); // Locator for username input
  await usernameInput.fill('standard_user'); // Action: Fill username

  const passwordInput = page.locator('[data-test="password"]'); // Locator for password input
  await passwordInput.fill('secret_sauce'); // Action: Fill password

  const loginButton = page.locator('[data-test="login-button"]'); // Locator for login button
  await loginButton.click(); // Action: Click login button

  const pageTitle = page.locator('.title'); // Locator for page title
  await expect(pageTitle).toHaveText('Products'); // Assertion: Verify products page is displayed

  // ADD PRODUCTS MODULE
  const backpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'); // Locator for Sauce Labs Backpack
  await backpackButton.click(); // Action: Click add-to-cart

  const filterDropdown = page.locator('.product_sort_container'); // Locator for product sort dropdown
  await filterDropdown.selectOption('za'); // Action: Apply filter Name (Z to A)

  const tShirtButton = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'); // Locator for T-Shirt (Red)
  await tShirtButton.click(); // Action: Click add-to-cart

  // CART MODULE
  const cartIcon = page.locator('.shopping_cart_link'); // Locator for cart icon
  await cartIcon.click(); // Action: Click to open cart
  await expect(pageTitle).toHaveText('Your Cart'); // Assertion: Verify cart page is displayed

  const checkoutButton = page.locator('[data-test="checkout"]'); // Locator for checkout button
  await checkoutButton.click(); // Action: Click checkout button

  // CHECKOUT INFORMATION MODULE
  const firstNameInput = page.locator('[data-test="firstName"]'); // Locator for first name input
  await firstNameInput.fill('Misbah'); // Action: Fill first name

  const lastNameInput = page.locator('[data-test="lastName"]'); // Locator for last name input
  await lastNameInput.fill('Waseem'); // Action: Fill last name

  const postalCodeInput = page.locator('[data-test="postalCode"]'); // Locator for postal code input
  await postalCodeInput.fill('12345'); // Action: Fill postal code

  const continueButton = page.locator('[data-test="continue"]'); // Locator for continue button
  await continueButton.click(); // Action: Click to continue to overview
  await expect(pageTitle).toHaveText('Checkout: Overview'); // Assertion: Verify overview page is displayed

  // FINISH ORDER MODULE
  const finishButton = page.locator('[data-test="finish"]'); // Locator for finish button
  await finishButton.click(); // Action: Click finish to complete the order

  const completeMessage = page.locator('.complete-header'); // Locator for order completion message
  await expect(completeMessage).toHaveText('Thank you for your order!'); // Assertion: Verify order completion message

  // RETURN TO PRODUCTS MODULE
  const backHomeButton = page.locator('[data-test="back-to-products"]'); // Locator for back home button
  await backHomeButton.click(); // Action: Click to return to products page
  await expect(pageTitle).toHaveText('Products'); // Assertion: Verify products page is displayed again

});

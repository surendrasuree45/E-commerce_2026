import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/cartPage';

test.describe('Empty Cart', () => {

  test('should handle place order flow when cart is empty', async ({
    page,
  }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToHome();

    // Navigate directly to cart
    await homePage.openCart();

    // Verify there are no products
    await cartPage.verifyCartIsEmpty();

    // Try to place an order
    await cartPage.placeOrder();

    // Verify order modal is displayed
    await expect(cartPage.orderModal).toBeVisible();

    // Try to purchase without customer details
    await cartPage.purchaseButton.click();

    // DemoBlaze validates required fields through browser/application
    // behavior. The important assertion is that the order is not
    // successfully completed.
    await expect(
      cartPage.confirmationMessage
    ).not.toBeVisible();
  });
});
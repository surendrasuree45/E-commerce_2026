import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { uiTestData } from '../utils/testData';

test.describe('Cart State', () => {

  test('should retain cart product after navigation and page refresh', async ({
    page,
  }) => {

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToHome();

    // Add product
    await productPage.openProduct(uiTestData.products.primary);
    await productPage.addToCart();

    // Navigate to cart
    await homePage.openCart();

    // Verify product exists
    await cartPage.verifyProductInCart(uiTestData.products.primary);

    // Refresh cart page
    await page.reload();

    // Verify product still exists
    await cartPage.verifyProductInCart(uiTestData.products.primary);

    // Navigate back to Home
    await page.getByRole('link', {
      name: /PRODUCT STORE/i,
    }).click();

    await expect(page).toHaveURL(/index\.html/);

    // Navigate to cart again
    await homePage.openCart();

    // Verify cart state is retained
    await cartPage.verifyProductInCart(uiTestData.products.primary);
  });
});
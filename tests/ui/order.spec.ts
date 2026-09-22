import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { uiTestData } from '../utils/testData';

test.describe('@regression Order Placement', () => {

  test('should place an order with valid customer details', async ({
    page,
  }) => {

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToHome();

    // Add product
    await productPage.openProduct(uiTestData.products.primary);
    await productPage.addToCart();

    // Open cart
    await homePage.openCart();

    await cartPage.verifyProductInCart(uiTestData.products.primary);

    // Open order form
    await cartPage.placeOrder();

    // Fill customer details
    await cartPage.fillOrderDetails();

    // Purchase
    await cartPage.purchaseOrder();

    // Verify successful purchase
    await expect(
      cartPage.confirmationMessage
    ).toBeVisible();

    await cartPage.closeConfirmation();
  });
});
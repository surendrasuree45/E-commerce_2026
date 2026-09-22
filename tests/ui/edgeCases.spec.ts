import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { uiTestData } from '../utils/testData';

test.describe('@edge Cart boundary cases', () => {
    test('should retain the remaining product when one of two products is removed', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        await productPage.addProduct(uiTestData.products.primary);
        await homePage.navigateToHome();
        await productPage.addProduct(uiTestData.products.secondary);
        await homePage.openCart();

        await cartPage.removeProduct(uiTestData.products.primary);

        await cartPage.verifyProductNotInCart(uiTestData.products.primary);
        await cartPage.verifyProductInCart(uiTestData.products.secondary);
        await expect(cartPage.cartTable.locator('tr')).toHaveCount(1);
    });

    test('should preserve duplicate product entries when the same product is added twice', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const productName = uiTestData.products.primary;

        await homePage.navigateToHome();
        await productPage.addProduct(productName);
        await homePage.navigateToHome();
        await productPage.addProduct(productName);
        await homePage.openCart();

        await expect(
            cartPage.cartTable.locator('tr').filter({ hasText: productName })
        ).toHaveCount(2);
    });

    test('should empty the cart after a successful purchase', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();
        await productPage.addProduct(uiTestData.products.primary);
        await homePage.openCart();
        await cartPage.placeOrder();
        await cartPage.fillOrderDetails();
        await cartPage.purchaseOrder();
        await cartPage.closeConfirmation();

        await page.goto('/cart.html');
        await cartPage.verifyCartIsEmpty();
    });
});
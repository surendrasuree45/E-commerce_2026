import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { uiTestData } from '../utils/testData';

test.describe('@regression Remove Product from Cart', () => {
    test('should remove a product from cart successfully', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const productName = uiTestData.products.primary;

        await homePage.navigateToHome();
        await productPage.addProduct(productName);
        await homePage.openCart();
        await cartPage.verifyProductInCart(productName);
        await cartPage.removeProduct(productName);
        await cartPage.verifyProductNotInCart(productName);
    });
});
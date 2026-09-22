import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { uiTestData } from '../utils/testData';

test.describe('@regression Cart - Multiple Products', () => {

    test('should add multiple products and verify cart contents', async ({
        page,
    }) => {

        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await homePage.navigateToHome();

        await productPage.addProduct(uiTestData.products.primary);

        await homePage.navigateToHome();

        await productPage.addProduct(uiTestData.products.secondary);

        await homePage.openCart();

        await cartPage.verifyProductsInCart([
            uiTestData.products.primary,
            uiTestData.products.secondary,
        ]);
    });
});
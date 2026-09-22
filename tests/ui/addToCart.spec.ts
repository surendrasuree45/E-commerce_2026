import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { uiTestData } from '../utils/testData';

test.describe('@regression Add Product to Cart', () => {
    test('should add a product to cart successfully', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const productName = uiTestData.products.primary;

        await homePage.navigateToHome();
        await productPage.addProduct(productName);
        await homePage.openCart();
        await cartPage.verifyProductInCart(productName);
    });
});
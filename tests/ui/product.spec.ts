import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { uiTestData } from '../utils/testData';

test.describe('@regression Product Details', () => {
    test('should display product details correctly', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const productName = uiTestData.products.primary;

        await homePage.navigateToHome();
        await productPage.openProduct(productName);
        await productPage.verifyProductDetails(productName);
    });
});
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { uiTestData } from '../utils/testData';

test.describe('@regression Product Categories', () => {
    test('should display products for each category', async ({ page }) => {
        const homePage = new HomePage(page);
        const categories = uiTestData.categories;

        await homePage.navigateToHome();

        for (const category of categories) {
            await homePage.clickCategory(category);

            const products = page.locator('#tbodyid .card');
            await expect(products.first()).toBeVisible();
            await expect(products).not.toHaveCount(0);
        }
    });
});
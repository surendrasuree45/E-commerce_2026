import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('@regression Home Page', () => {
    test('should load homepage and display product categories', async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.navigateToHome();

        await expect(page).toHaveTitle(/STORE/i);
        await expect(homePage.productStoreLogo).toBeVisible();
        await homePage.verifyCategories();
    });
});
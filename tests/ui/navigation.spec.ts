import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('@regression Application Navigation', () => {

  test('should navigate between Home, Categories and Cart', async ({
    page,
  }) => {

    const homePage = new HomePage(page);

    // Home
    await homePage.navigateToHome();

    await homePage.verifyHomePage();

    // Navigate to Phones category
    await homePage.clickPhones();
    await expect(page.locator('#tbodyid .card')).not.toHaveCount(0);

    // Navigate to Laptops category
    await homePage.clickLaptops();
    await expect(page.locator('#tbodyid .card')).not.toHaveCount(0);

    // Navigate to Monitors category
    await homePage.clickMonitors();
    await expect(page.locator('#tbodyid .card')).not.toHaveCount(0);

    // Navigate to Cart
    await homePage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(
      page.getByRole('button', { name: 'Place Order' })
    ).toBeVisible();
  });
});
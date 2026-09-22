import { expect, Page, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { uiTestData } from '../utils/testData';

async function openOrderForm(page: Page) {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToHome();
    await productPage.addProduct(uiTestData.products.primary);
    await homePage.openCart();
    await cartPage.placeOrder();

    return cartPage;
}

async function expectOrderValidation(cartPage: CartPage) {
    await cartPage.purchaseButton.click({ force: true });

    await expect(cartPage.confirmationMessage).not.toBeVisible();
    await expect(cartPage.orderModal).toBeVisible();
}

test.describe('@negative Order validation', () => {
    test('should reject an order when all customer details are missing', async ({ page }) => {
        const cartPage = await openOrderForm(page);

        await expectOrderValidation(cartPage);
    });

    test('should reject an order when the customer name is missing', async ({ page }) => {
        const cartPage = await openOrderForm(page);

        await cartPage.countryInput.fill(uiTestData.customer.country);
        await cartPage.cityInput.fill(uiTestData.customer.city);
        await cartPage.cardInput.fill(uiTestData.customer.card);
        await cartPage.monthInput.fill(uiTestData.customer.month);
        await cartPage.yearInput.fill(uiTestData.customer.year);

        await expectOrderValidation(cartPage);
    });

    test('should reject an order when the credit card is missing', async ({ page }) => {
        const cartPage = await openOrderForm(page);

        await cartPage.nameInput.fill(uiTestData.customer.name);
        await cartPage.countryInput.fill(uiTestData.customer.country);
        await cartPage.cityInput.fill(uiTestData.customer.city);
        await cartPage.monthInput.fill(uiTestData.customer.month);
        await cartPage.yearInput.fill(uiTestData.customer.year);

        await expectOrderValidation(cartPage);
    });
});
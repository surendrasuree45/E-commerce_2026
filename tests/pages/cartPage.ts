import { Page, Locator, expect } from '@playwright/test';
import { uiTestData } from '../utils/testData';

export class CartPage {
    private page: Page;

    readonly cartTable: Locator;
    readonly placeOrderButton: Locator
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly cardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;
    readonly orderModal: Locator
    readonly confirmationMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cartTable = this.page.locator('#tbodyid');
        this.placeOrderButton = this.page.getByRole('button', {
            name: 'Place Order',
        });

        this.orderModal = this.page.locator('#orderModal');

        this.nameInput = this.page.locator('#name');
        this.countryInput = this.page.locator('#country');
        this.cityInput = this.page.locator('#city');
        this.cardInput = this.page.locator('#card');
        this.monthInput = this.page.locator('#month');
        this.yearInput = this.page.locator('#year');

        this.purchaseButton = this.page.getByRole('button', {
            name: 'Purchase',
        });

        this.confirmationMessage = this.page.getByText(
            'Thank you for your purchase!'
        );

    }
    async verifyProductInCart(productName: string) {
        await expect(this.cartTable).toContainText(productName);
    }

    async removeProduct(productName: string) {
        const productRow = this.cartTable.locator('tr').filter({ hasText: productName });

        await expect(productRow).toBeVisible();
        await productRow.getByText('Delete', { exact: true }).click();
    }

    async verifyProductNotInCart(productName: string) {
        await expect(this.cartTable).not.toContainText(productName);
    }

    async verifyProductsInCart(productNames: string[]) {
        for (const productName of productNames) {
            await expect(this.cartTable).toContainText(productName);
        }
    }

    async placeOrder() {
        await this.placeOrderButton.click();

        await expect(this.orderModal).toBeVisible();
    }

    async fillOrderDetails() {
        await this.nameInput.fill(uiTestData.customer.name);
        await this.countryInput.fill(uiTestData.customer.country);
        await this.cityInput.fill(uiTestData.customer.city);
        await this.cardInput.fill(uiTestData.customer.card);
        await this.monthInput.fill(uiTestData.customer.month);
        await this.yearInput.fill(uiTestData.customer.year);
    }

    async purchaseOrder() {
        await this.purchaseButton.click();

        await expect(this.confirmationMessage).toBeVisible();
    }

    async closeConfirmation() {
        await this.page.getByRole('button', {
            name: 'OK',
        }).click();
    }

    async verifyCartIsEmpty() {
        await expect(this.cartTable).toBeEmpty();
    }
}
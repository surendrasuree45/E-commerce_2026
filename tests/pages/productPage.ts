import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {

    private page: Page;
    readonly addToCartButton: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly productDescription: Locator;

    constructor(page: Page) {

        this.page = page;


        this.addToCartButton = this.page.getByText('Add to cart', {
            exact: true,
        });

        this.productTitle = this.page.locator('.name');
        this.productPrice = this.page.locator('.price-container');
        this.productDescription = this.page.locator('#more-information');
    }


    async openProduct(productName: string) {
        await this.page.getByText(productName, {
            exact: true,
        }).click();

        await expect(this.productTitle).toContainText(productName);
    }

    async addToCart() {
        const dialogPromise = this.page.waitForEvent('dialog');

        await this.addToCartButton.click();

        const dialog = await dialogPromise;

        expect(dialog.message()).toContain('Product added');
        await dialog.accept();
    }

    async verifyProductDetails(productName: string) {
        await expect(this.productTitle).toContainText(productName);
        await expect(this.productPrice).toBeVisible();
        await expect(this.productDescription).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
    }

    async addProduct(productName: string) {
        await this.page.getByText(productName, {
            exact: true,
        }).click();

        await expect(this.productTitle).toContainText(productName);

        const dialogPromise = this.page.waitForEvent('dialog');

        await this.addToCartButton.click();

        const dialog = await dialogPromise;

        expect(dialog.message()).toContain('Product added');

        await dialog.accept();
    }

}
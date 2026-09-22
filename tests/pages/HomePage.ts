import { Locator, Page, expect } from '@playwright/test';
import { uiTestData } from '../utils/testData';

export class HomePage {
    private page: Page;

    readonly homeLink: Locator;
    readonly cartLink: Locator;
    readonly productStoreLogo: Locator;

    readonly phonesCategory: Locator;

    readonly laptopsCategory: Locator;

    readonly monitorsCategory: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeLink = this.page.locator('a.navbar-brand');
        this.cartLink = this.page.locator('#cartur');
        this.productStoreLogo = this.page.locator('.navbar-brand');
        this.phonesCategory = this.page.getByText(uiTestData.categories[0], { exact: true });
        this.laptopsCategory = this.page.getByText(uiTestData.categories[1], { exact: true });
        this.monitorsCategory = this.page.getByText(uiTestData.categories[2], { exact: true });
    }

    async navigateToHome() {
        await this.page.goto('/index.html');
    }

    async clickPhones() {
        await this.phonesCategory.click();
        await this.waitForProducts();
    }

    async clickLaptops() {
        await this.laptopsCategory.click();
        await this.waitForProducts();
    }

    async clickMonitors() {
        await this.monitorsCategory.click();
        await this.waitForProducts();
    }

    async clickCategory(category: typeof uiTestData.categories[number]) {
        await this.page.getByText(category, { exact: true }).click();
        await this.waitForProducts();
    }

    private async waitForProducts() {
        await expect(this.page.locator('#tbodyid .card').first()).toBeVisible();
    }

    async openCart() {
        await this.cartLink.click();
        await this.page.waitForURL(/cart\.html/);
    }

    async verifyCategories() {
        await expect(this.phonesCategory).toBeVisible();
        await expect(this.laptopsCategory).toBeVisible();
        await expect(this.monitorsCategory).toBeVisible();
    }

    async verifyHomePage() {
        await expect(this.page).toHaveTitle(/STORE/i);
        await expect(this.phonesCategory).toBeVisible();
        await expect(this.laptopsCategory).toBeVisible();
        await expect(this.monitorsCategory).toBeVisible();
    }
}
import { Page } from '@playwright/test';

export class AllPantsPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get itemName () {
        return this.page.locator('.product.name a');
    }
   
}
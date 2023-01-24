import { Page } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get itemInfoLabel () {
        return this.page.locator('.item-options dd');
    }
   
}

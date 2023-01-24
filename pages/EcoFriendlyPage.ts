import { Page } from '@playwright/test';

export class EcoFriendlyPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get searchField(){
        return this.page.locator('#search');
    }
    
    get searchButton(){
        return this.page.locator('.action.search');
    }

    get switchSotingDirectionButton(){
        return this.page.locator('[data-role="direction-switcher"]').first();
    }

    get sortBy(){
        return this.page.locator('#sorter').first();
    }

    get productName(){
        return this.page.locator('.product.name  a');
    }
}

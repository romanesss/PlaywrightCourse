import { Page } from '@playwright/test';

export class ItemViewPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    get addToWishListButton(){
        return this.page.locator('[data-action="add-to-wishlist"]');
    }

    get systemMessage(){
        return this.page.locator('.page.messages');
    }

    get xsSizeButton(){
        return this.page.locator('[aria-label="XS"]');
    }

    get blueColorBuuton(){
        return this.page.locator('[aria-label="Blue"]');
    }
}   


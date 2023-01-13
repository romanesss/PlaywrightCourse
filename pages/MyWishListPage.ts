import { Page } from '@playwright/test';

export class MyWishListPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    get radiantTeeImg(){
        return this.page.locator('.products-grid .product-image-photo');
    }
    get radiantTeeItem(){
        return this.page.locator('.products-grid .product-item-name a');
    }

    get myWishListTitle(){
        return this.page.locator('.page-title-wrapper');
    }

    get addAllToCardButton () {
        return this.page.locator('[class="action tocart"]');
    }

    get successSystemMessage(){
        return this.page.locator('.message-success div');
    }
} 
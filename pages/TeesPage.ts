import { Page } from '@playwright/test';

export class TeesPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    };

    get itemImg(){
        return this.page.locator('.product-image-photo');
    }

    get itemReviews(){
        return this.page.locator('.view');
    }

    get itemPrice(){
        return this.page.locator('.product .price');
    }

    get addToCard(){
        return this.page.locator('.action.tocart')
    }
}



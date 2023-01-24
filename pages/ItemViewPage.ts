import { Page } from '@playwright/test';

export class ItemViewPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    get addToWishListButton(){
        return this.page.locator('[data-action="add-to-wishlist"]');
    }

    get addToCardButton(){
        return this.page.locator('#product-addtocart-button');
    }

    get systemMessage(){
        return this.page.locator('.message-success div');
    }

    get xsSizeButton(){
        return this.page.locator('[aria-label="XS"]');
    }

    get size28Button(){
        return this.page.locator('[aria-label="28"]');
    }

    get blueColorBuuton(){
        return this.page.locator('[aria-label="Blue"]');
    }

    get blackColorButton(){
        return this.page.locator('[aria-label="Black"]');
    }

    get moreInfoButton(){
        return this.page.locator('[aria-controls="additional"] a');
    }

    get styleInfoLabel(){
        return this.page.locator('[data-th="Style"]');
    }

    get materialInfoLabel(){
        return this.page.locator('[data-th="Material"]');
    }

    get patternInfoLabel(){
        return this.page.locator('[data-th="Pattern"]');
    }

    get climateInfoLabel(){
        return this.page.locator('[data-th="Climate"]');
    }
}   


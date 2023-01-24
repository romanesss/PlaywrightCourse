import { Page } from '@playwright/test';

export class BagsPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    };

    get itemImg(){
        return this.page.locator('.product-image-photo');
    }

    get pruductActions(){
        return this.page.locator('.product-item-actions');
    }

    get showPerPageLimiter(){
        return this.page.locator('#limiter').nth(1);
    }

    get switchSotingDirectionButton(){
        return this.page.locator('[data-role="direction-switcher"]').first();
    }

    get sortBy(){
        return this.page.locator('#sorter').first();
    }

    get productName(){
        return this.page.locator('.product.name a');
    }
}



import { Page } from '@playwright/test';

export class SalePage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    };

    get womansTeesButton(){
        return this.page.locator('.item [href*="tees-women"]');
    }
}



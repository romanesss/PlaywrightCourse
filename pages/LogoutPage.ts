import { Page } from '@playwright/test';

export class LogoutPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get logoutMessage(){
        return  this.page.locator('.page-title-wrapper');
    }
} 
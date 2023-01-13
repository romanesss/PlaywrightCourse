import { Page } from '@playwright/test';

export class MyAccountPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    get changePasswordButton(){
        return  this.page.locator('.change-password');
    }
} 
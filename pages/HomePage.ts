import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    async logout(){
        await this.page.locator('.panel .customer-welcome').click();
        await this.page.locator('.active li').filter({ hasText: 'Sign Out' }).click();
    }
    
    async goToMyAccount(){
        await this.page.locator('.panel .customer-welcome').click();
        await this.page.locator('.active li').filter({ hasText: 'My Account' }).click(); 
    }

    get customerWelcomeDropdown(){
        return this.page.locator('.panel .customer-welcome');
    }

} 
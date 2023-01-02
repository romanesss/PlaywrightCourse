import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async register(firstName: string,lastName:string, email: string, password: string) {
        await this.page.type('#firstname', firstName);
        await this.page.type('#lastname', lastName);
        await this.page.type('#email_address', email);
        await this.page.type('#password', password);
        await this.page.type('#password-confirmation', password);
        await this.page.click('.primary .submit');
    }
    
    async logout(){
        await this.page.locator('.panel .customer-welcome').click();
        await this.page.locator('.active li').filter({ hasText: 'Sign Out' }).click();
    }
    
    get CreateAnAccountButton(){
        return this.page.locator('.panel.wrapper li').filter({ hasText: 'Create an Account' });
    }

    get registrationMessage(){
        return this.page.locator('.page.messages');
    }

    get logoutMessage(){
        return  this.page.locator('.page-title-wrapper');
    }
} 
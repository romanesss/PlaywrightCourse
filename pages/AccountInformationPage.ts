import { Page } from '@playwright/test';

export class AccountInformationPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get currentPasswordField(){
        return this.page.locator('#current-password');
    }

    get NewPasswordField(){
        return this.page.locator('#password');
    }

    get passwordConfirmationField(){
        return this.page.locator('#password-confirmation');
    }

    get saveButton(){
        return this.page.locator('.save.primary');
    }
} 

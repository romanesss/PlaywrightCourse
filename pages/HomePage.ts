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

    get contentTitles(){
        return this.page.locator('.content .title');
    }

    get contentActions () {
        return this.page.locator('.content .action.more');
    }

    get contentInfo() {
        return this.page.locator('.content .info');
    }

    get contentHeadingTitle(){
        return this.page.locator('.content-heading .title');
    }

    get contentHeadingInfo(){
        return this.page.locator('.content-heading .info');
    }

    get homeMainImg() {
        return this.page.locator('.home-main');
    }

    get homeTShirtsImg() {
        return this.page.locator('.home-t-shirts');
    }

    get homePantsImg() {
        return this.page.locator('.home-pants');
    }

    get homeErinImg() {
        return this.page.locator('.home-erin');
    }

    get homePerfomanceImg() {
        return this.page.locator('.home-performance');
    }

    get homeEcoImg() {
        return this.page.locator('.home-eco');
    }

    get radiantTeeItem(){
        return this.page.locator('[title="Radiant Tee"]');
    }
} 
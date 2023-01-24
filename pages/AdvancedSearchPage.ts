import { Page } from '@playwright/test';

export class AdvancedSearchPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    };

    async fillproductName(name: string){
        await this.page.type('#name', name);
    };

    async fillSKU(sku: string){
        await this.page.type('#sku', sku);
    };

    async fillDescription(description: string){
        await this.page.type('#description', description);
    };

    async fillShortDescription(shortDescription: string){
        await this.page.type('#short_description', shortDescription);
    };

    async fillPrice(price: string){
        await this.page.type('#price', price);
    };

    async fillPriceTo(priceTo: string){
        await this.page.type('#price_to', priceTo);
    };

    get searchButton(){
        return this.page.locator('.action.search.primary');
    }

    get errorSystemMessage(){
        return this.page.locator('.message.error div');
    }
}



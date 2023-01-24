import { Page } from '@playwright/test';

export class OrderInformationPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    };

    async fillOrderId(id: string){
        await this.page.type('#oar-order-id', id);
    };

    async fillbillingLastName(billingLastName: string){
        await this.page.type('#oar-billing-lastname', billingLastName);
    };

    async fillorderEmail(orderEmail: string){
        await this.page.type('#oar_email', orderEmail);
    };

    get continueButton(){
        return this.page.locator('[title="Continue"]');
    };
    
    get errorSystemMessage(){
        return this.page.locator('.message-error div');
    }
}

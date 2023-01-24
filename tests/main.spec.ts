import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { ItemViewPage } from '../pages/ItemViewPage';
import { MyWishListPage } from '../pages/MyWishListPage';
import { AllPantsPage } from '../pages/AllPantsPage';
import { ShoppingCartPage} from '../pages/ShoppingCartPage';
import { EcoFriendlyPage } from '../pages/EcoFriendlyPage';
import { OrderInformationPage } from '../pages/OrderInformationPage';
import { AdvancedSearchPage } from '../pages/AdvancedSearchPage';
import { SalePage } from '../pages/SalePage';
import { TeesPage } from '../pages/TeesPage';
import { BagsPage } from '../pages/BagsPage';

test.describe('group scenarios', () => {
  test('1 scenario - Verify creating account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&'
    await page.goto('https://magento.softwaretestingboard.com/');
    // create account > check message
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await expect(loginPage.systemMessage).toHaveText('Thank you for registering with Fake Online Clothing Store.');
    // logout > check message
    await homePage.logout();
    await expect(loginPage.logoutMessage).toHaveText('You are signed out');
  });

  test('2 scenario - reset password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const myAccountPage = new MyAccountPage(page);
    const accountInformationPage = new AccountInformationPage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&'
    const newPassword ='&qwerty123qwerty&'
    // register new user
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    // go to my account module
    await page.goto('https://magento.softwaretestingboard.com/');
    await homePage.goToMyAccount();
    await myAccountPage.changePasswordButton.click();
    // change password
    await accountInformationPage.currentPasswordField.fill(password);
    await accountInformationPage.NewPasswordField.fill(newPassword);
    await accountInformationPage.passwordConfirmationField.fill(newPassword);
    await accountInformationPage.saveButton.click();
    await expect(loginPage.systemMessage).toHaveText('You saved the account information.');
    // try to login with old credentials
    await loginPage.login(mail, password);
    await expect(loginPage.systemMessage).toHaveText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
    // login with new password
    await loginPage.login(mail, newPassword);
    await expect(homePage.customerWelcomeDropdown).toBeVisible();
  });

  test('3 scenario - verify banners & content', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&'
    // register
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await page.goto('https://magento.softwaretestingboard.com/');
    // check content info
    await expect(homePage.contentInfo.filter({ hasText: 'New Luma Yoga Collection'})).toBeVisible;
    await expect(homePage.contentInfo.filter({ hasText: 'Luma pants when you shop today*'})).toBeVisible();
    await expect(homePage.contentInfo.filter({ hasText: 'Buy 3 Luma tees get a 4th free'})).toBeVisible();
    await expect(homePage.contentInfo.filter({ hasText: 'Luma founder Erin Renny shares her favorites!'})).toBeVisible();
    await expect(homePage.contentInfo.filter({ hasText: 'Wicking to raingear, Luma covers you'})).toBeVisible();
    await expect(homePage.contentInfo.filter({ hasText: 'Find conscientious, comfy clothing in our eco-friendly collection'})).toBeVisible();
    await expect(homePage.contentHeadingInfo).toHaveText('Here is what`s trending on Luma right now');
    // check content  titles
    await expect(homePage.contentTitles.filter({ hasText: 'Get fit and look fab in new seasonal styles'})).toBeVisible();
    await expect(homePage.contentTitles.filter({ hasText: '20% OFF'})).toBeVisible();
    await expect(homePage.contentTitles.filter({ hasText: 'Even more ways to mix and match'})).toBeVisible();
    await expect(homePage.contentTitles.filter({ hasText: 'Take it from Erin'})).toBeVisible();
    await expect(homePage.contentTitles.filter({ hasText: 'Science meets performance'})).toBeVisible();
    await expect(homePage.contentTitles.filter({ hasText: 'Twice around, twice as nice'})).toBeVisible();
    await expect(homePage.contentHeadingTitle).toHaveText('Hot Sellers');
    // check content actions
    await expect(homePage.contentActions.filter({ hasText: 'Shop New Yoga'})).toBeVisible();
    await expect(homePage.contentActions.filter({ hasText: 'Shop Pants'})).toBeVisible();
    await expect(homePage.contentActions.filter({ hasText: 'Shop Tees'})).toBeVisible();
    await expect(homePage.contentActions.filter({ hasText: 'Shop Erin Recommends'})).toBeVisible();
    await expect(homePage.contentActions.filter({ hasText: 'Shop Performance'})).toBeVisible();
    await expect(homePage.contentActions.filter({ hasText: 'Shop Eco-Friendly'})).toBeVisible();
    // check imgs
    await expect(homePage.homeEcoImg).toBeVisible();
    await expect(homePage.homeErinImg).toBeVisible();
    await expect(homePage.homeMainImg).toBeVisible();
    await expect(homePage.homePantsImg).toBeVisible();
    await expect(homePage.homeTShirtsImg).toBeVisible();
    await expect(homePage.homePerfomanceImg).toBeVisible();
  });

  test('4 scenario - add item to wishlist', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const itemViewPage = new ItemViewPage(page);
    const myWishListPage = new MyWishListPage(page)
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&';
    //register
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await page.goto('https://magento.softwaretestingboard.com/');
    // add Radiant Tee to wish list
    await homePage.radiantTeeItem.click();
    await page.reload();
    await itemViewPage.xsSizeButton.click();
    await itemViewPage.blueColorBuuton.click();
    await expect(itemViewPage.addToWishListButton).toBeVisible();
    await itemViewPage.addToWishListButton.click();
    // check that element is added to wish list
    await expect(myWishListPage.myWishListTitle).toHaveText('My Wish List');
    await expect(myWishListPage.successSystemMessage).toHaveText('Radiant Tee has been added to your Wish List. Click here to continue shopping.')
    await page.reload();
    await expect(myWishListPage.radiantTeeItem).toHaveText('Radiant Tee');
    await expect(myWishListPage.radiantTeeImg).toBeVisible();
    // add Radiant Tee to card > check message
    await myWishListPage.addAllToCardButton.click();
    await expect(myWishListPage.successSystemMessage).toHaveText('1 product(s) have been added to shopping cart: "Radiant Tee".')
  });

  test('5 scenario - check item info and add to card', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const itemViewPage = new ItemViewPage(page);
    const shoppingCartPage = new ShoppingCartPage(page)
    const allPantsPage = new AllPantsPage(page)
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&'
    // register
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await page.goto('https://magento.softwaretestingboard.com/promotions/pants-all.html');
    // select and preview Portal Capri item > check item info
    await allPantsPage.itemName.filter({ hasText: 'Portia Capri'}).click();
    await itemViewPage.moreInfoButton.click();
    await expect(itemViewPage.styleInfoLabel).toHaveText('Capri');
    await expect(itemViewPage.materialInfoLabel).toHaveText('Organic Cotton');
    await expect(itemViewPage.patternInfoLabel).toHaveText('Solid');
    await expect(itemViewPage.climateInfoLabel).toHaveText('Indoor, Mild, Hot');
    // select color and size > add to card
    await itemViewPage.blueColorBuuton.click();
    await itemViewPage.size28Button.click();
    await itemViewPage.addToCardButton.click();
    await expect(itemViewPage.systemMessage).toHaveText('You added Portia Capri to your shopping cart.');
    // go to shoping cart page > verify item is added to the cart with the correct color and size 
    await page.goto('https://magento.softwaretestingboard.com/checkout/cart/');
    await expect(shoppingCartPage.itemInfoLabel.filter({ hasText: '28'})).toBeVisible;
    await expect(shoppingCartPage.itemInfoLabel.filter({ hasText: 'Blue'})).toBeVisible;    
  });

  test('6 scenario - search "tank" > add the most expensive one to the cart ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const itemViewPage = new ItemViewPage(page);
    const shoppingCartPage = new ShoppingCartPage(page)
    const ecoFriendlyPage = new EcoFriendlyPage(page)
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&';
    // register
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    // go to eco friendly page > search 'tank'
    await page.goto('https://magento.softwaretestingboard.com/collections/eco-friendly.html');
    await ecoFriendlyPage.searchField.fill('tank');
    await ecoFriendlyPage.searchButton.click();
    // set sort from max to low val
    await ecoFriendlyPage.switchSotingDirectionButton.click();
    await page.waitForLoadState();
    // set sort by price
    await ecoFriendlyPage.sortBy.selectOption('price');
    // select most expensive
    let mostExpensiveName = await ecoFriendlyPage.productName.first().textContent()
    await ecoFriendlyPage.productName.first().click();
    // select color and size > add to card
    await itemViewPage.blackColorButton.click();
    await itemViewPage.xsSizeButton.click();
    await itemViewPage.addToCardButton.click();
    await expect(itemViewPage.systemMessage).toHaveText('You added' + mostExpensiveName + 'to your shopping cart.');
    // go to shoping cart page > verify item is added to the cart with the correct color and size 
    await page.goto('https://magento.softwaretestingboard.com/checkout/cart/');
    await expect(shoppingCartPage.itemInfoLabel.filter({ hasText: 'XS'})).toBeVisible;
    await expect(shoppingCartPage.itemInfoLabel.filter({ hasText: 'Black'})).toBeVisible;   
  });

  test('7 scenario - select tees from the left menu > verify img, reviews, price, add to card', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const teesPage = new TeesPage(page);
    const salePage = new SalePage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&';
    // register
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    // check image, price, review
    await page.goto('https://magento.softwaretestingboard.com/sale.html');
    await salePage.womansTeesButton.click();
    await expect (teesPage.itemImg).toHaveCount(12);
    await expect (teesPage.itemPrice).toHaveCount(12);
    await expect (teesPage.itemReviews).toHaveCount(12);
    await teesPage.itemImg.first().hover();
    await expect(teesPage.addToCard.first()).toBeVisible();
  });

  test('8 scenario - verify frame and sorting ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bagsPage = new BagsPage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&';
    // register
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    // check frame on hover over
    await page.goto('https://magento.softwaretestingboard.com/gear/bags.html');
    await bagsPage.itemImg.first().hover();
    await expect(bagsPage.pruductActions.first()).toBeVisible();
    await page.waitForLoadState();
    // check price sorting
    await bagsPage.sortBy.selectOption('price');
    await page.waitForLoadState();
    await bagsPage.showPerPageLimiter.selectOption('24');
    await expect(bagsPage.productName.first()).toHaveText('Savvy Shoulder Tote');
    await expect(bagsPage.productName.last()).toHaveText('Impulse Duffle');
    await page.waitForLoadState();
    await bagsPage.switchSotingDirectionButton.click()
    await expect(bagsPage.productName.first()).toHaveText('Impulse Duffle');
    await expect(bagsPage.productName.last()).toHaveText('Savvy Shoulder Tote');    
    // check product name sorting
    await page.waitForLoadState();
    await bagsPage.sortBy.selectOption('Product Name');
    await expect(bagsPage.productName.first()).toHaveText('Wayfarer Messenger Bag');
    await expect(bagsPage.productName.last()).toHaveText('Compete Track Tote');
    await page.waitForLoadState();
    await bagsPage.switchSotingDirectionButton.click()
    await expect(bagsPage.productName.first()).toHaveText('Compete Track Tote');
    await expect(bagsPage.productName.last()).toHaveText('Wayfarer Messenger Bag');
  });

  test('9 scenario - submit the form with a non-existing order id', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const orderInformationPage = new OrderInformationPage(page);
    const homePage = new HomePage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&';
    const orderId = randNumber(5);
    //register
    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await expect(loginPage.systemMessage).toHaveText('Thank you for registering with Fake Online Clothing Store.');
    await homePage.logout();
    // submit form
    await page.goto('https://magento.softwaretestingboard.com/sales/guest/form/');
    await orderInformationPage.fillOrderId(orderId.toString());
    await orderInformationPage.fillbillingLastName(lastName);
    await orderInformationPage.fillorderEmail(mail);
    await orderInformationPage.continueButton.click();
    await expect(orderInformationPage.errorSystemMessage).toHaveText('You entered incorrect data. Please try again.');
  });

  test('10 scenario - ubmit the form with any random data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const advancedSearchPage = new AdvancedSearchPage(page);

    const productName = generateString(10);
    const sku = generateString(10);
    const shortDescription = generateString(10);
    const description = generateString(10);
    const price = randNumber(10);
    const priceTo = randNumber(100);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&';

    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    
    await page.goto('https://magento.softwaretestingboard.com/catalogsearch/advanced/');
    await advancedSearchPage.fillproductName(productName);
    await advancedSearchPage.fillSKU(sku);
    await advancedSearchPage.fillDescription(description);
    await advancedSearchPage.fillShortDescription(shortDescription);
    await advancedSearchPage.fillPrice(price.toString());
    await advancedSearchPage.fillPriceTo(priceTo.toString());
    await advancedSearchPage.searchButton.click();
    await expect(advancedSearchPage.errorSystemMessage).toHaveText("We can't find any items matching these search criteria. Modify your search.");    
  });
  
  function makeEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i = 0; i < 10; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com"
    return strEmail;

    //const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    //await delay(3000)
  } 

  function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function randNumber(max) {
    return Math.floor(Math.random() * max);
  }

});
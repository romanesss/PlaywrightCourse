import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { LogoutPage } from '../pages/LogoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';
import { ItemViewPage } from '../pages/ItemViewPage';
import { MyWishListPage } from '../pages/MyWishListPage';



test.describe('group scenarios', () => {
  test('1 scenario - Verify creating account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const logoutPage = new LogoutPage(page);
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
    await expect(logoutPage.logoutMessage).toHaveText('You are signed out');
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

    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await page.goto('https://magento.softwaretestingboard.com/');
    
    // check content info
    await expect(homePage.contentInfo.filter({ hasText: 'New Luma'})).toHaveText('New Luma Yoga Collection');
    await expect(homePage.contentInfo.filter({ hasText: 'Luma pants'})).toHaveText('Luma pants when you shop today*');
    await expect(homePage.contentInfo.filter({ hasText: 'Buy 3'})).toHaveText('Buy 3 Luma tees get a 4th free');
    await expect(homePage.contentInfo.filter({ hasText: 'Luma founder'})).toHaveText('Luma founder Erin Renny shares her favorites!');
    await expect(homePage.contentInfo.filter({ hasText: 'Wickin'})).toHaveText('Wicking to raingear, Luma covers you');
    await expect(homePage.contentInfo.filter({ hasText: 'Find'})).toHaveText('Find conscientious, comfy clothing in our eco-friendly collection');
    await expect(homePage.contentHeadingInfo).toHaveText('Here is what`s trending on Luma right now');

    // check content  titles
    await expect(homePage.contentTitles.filter({ hasText: 'Get'})).toHaveText('Get fit and look fab in new seasonal styles');
    await expect(homePage.contentTitles.filter({ hasText: '20%'})).toHaveText('20% OFF');
    await expect(homePage.contentTitles.filter({ hasText: 'Even'})).toHaveText('Even more ways to mix and match');
    await expect(homePage.contentTitles.filter({ hasText: 'Take'})).toHaveText('Take it from Erin');
    await expect(homePage.contentTitles.filter({ hasText: 'Science'})).toHaveText('Science meets performance');
    await expect(homePage.contentTitles.filter({ hasText: 'Twice'})).toHaveText('Twice around, twice as nice');
    await expect(homePage.contentTitles.filter({ hasText: 'Newsletter'})).toHaveText('Newsletter');
    await expect(homePage.contentHeadingTitle).toHaveText('Hot Sellers');

    // check content actions
    await expect(homePage.contentActions.filter({ hasText: 'Shop New'})).toHaveText('Shop New Yoga');
    await expect(homePage.contentActions.filter({ hasText: 'Shop Pants'})).toHaveText('Shop Pants');
    await expect(homePage.contentActions.filter({ hasText: 'Shop Tees'})).toHaveText('Shop Tees');
    await expect(homePage.contentActions.filter({ hasText: 'Shop Erin'})).toHaveText('Shop Erin Recommends');
    await expect(homePage.contentActions.filter({ hasText: 'Shop Performance'})).toHaveText('Shop Performance');
    await expect(homePage.contentActions.filter({ hasText: 'Shop Eco-Friendly'})).toHaveText('Shop Eco-Friendly');
    
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
    const password = 'qwerty123qwerty&'

    await page.goto('https://magento.softwaretestingboard.com/');
    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await page.goto('https://magento.softwaretestingboard.com/');

    // add Radiant Tee to wish list
    await homePage.radiantTeeItem.click();
    await page.reload();
    await itemViewPage.xsSizeButton.click()
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
});
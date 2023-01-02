import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { LogoutPage } from '../pages/LogoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { AccountInformationPage } from '../pages/AccountInformationPage';


test.describe('group scenarios', () => {
  test.skip('1 scenario - Verify creating account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const logoutPage = new LogoutPage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&'

    await page.goto('https://magento.softwaretestingboard.com/');

    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await expect(loginPage.systemMessage).toHaveText('Thank you for registering with Fake Online Clothing Store.');

    await homePage.logout();
    await expect(logoutPage.logoutMessage).toHaveText('You are signed out') 
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

    await page.goto('https://magento.softwaretestingboard.com/');

    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await expect(loginPage.systemMessage).toHaveText('Thank you for registering with Fake Online Clothing Store.');

    await page.goto('https://magento.softwaretestingboard.com/')
    await homePage.goToMyAccount();

    await myAccountPage.changePasswordButton.click();
    
    await accountInformationPage.currentPasswordField.fill(password);
    await accountInformationPage.NewPasswordField.fill(newPassword);
    await accountInformationPage.passwordConfirmationField.fill(newPassword);
    await accountInformationPage.saveButton.click();
    await expect(loginPage.systemMessage).toHaveText('You saved the account information.');

    await loginPage.login(mail, password);
    await expect(loginPage.systemMessage).toHaveText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');

    await loginPage.login(mail, newPassword);
    
    await(homePage.customerWelcomeDropdown).isVisible();

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(3000)
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
  } 
});
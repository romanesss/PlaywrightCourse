import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('group scenarios', () => {
  test('1 scenario - Verify creating account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const mail = makeEmail();
    const firstName = 'auto - new name';
    const lastName = 'auto - last name';
    const password = 'qwerty123qwerty&'

    await page.goto('https://magento.softwaretestingboard.com/');

    await loginPage.CreateAnAccountButton.click();
    await loginPage.register(firstName, lastName, mail, password);
    await expect(loginPage.registrationMessage).toHaveText('Thank you for registering with Fake Online Clothing Store.');

    await loginPage.logout();
    await expect(loginPage.logoutMessage).toHaveText('You are signed out') 
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
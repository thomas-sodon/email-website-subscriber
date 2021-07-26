const { By, until } = require('selenium-webdriver');
const { family, apparel, computersAndElectronics } = require('./category');

const WAIT = 30000;

const scrollIntoView = async (driver, element) => {
  await driver.executeScript('arguments[0].scrollIntoView(false);', element);
};

exports.sites = {
  'www.kohls.com': {
    enabled: false,
    category: family,
    emailSubscribeUrl: 'https://www.kohls.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(
        By.css('[link="Get 15% off when yousign up for our emails"]')
      );
      await element.click();
      element = await driver.findElement(By.css('#email1'));
      await element.sendKeys(emailAddress);
      element = await driver.findElement(By.css('#email2'));
      await element.sendKeys(emailAddress);
      element = await driver.findElement(By.xpath('//button[@value=""]'));
      await element.click();
    },
  },
  'www.petsmart.com': {
    enabled: true,
    name: 'PetSmart',
    category: family,
    emailSubscribeUrl: 'https://www.petsmart.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.wait(
        until.elementLocated(By.css('#email-opt-in')),
        WAIT
      );
      await scrollIntoView(driver, element);
      element = await driver.findElement(By.css('#email-opt-in'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(
        By.css('#email-opt-in-form input[type="submit"]')
      );
      await element.click();
      element = await driver.findElement(By.css('.email-opt-in-messaging'));
      element = await driver.wait(
        until.elementTextContains(element, 'Success'),
        WAIT
      );
    },
  },
  'www.macys.com': {
    enabled: false,
    name: 'Macys',
    category: family,
    emailSubscribeUrl:
      'https://www.macys.com/index.ognc?lid=glbbtmnav_go_to_us_site-intl',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(By.css('[link="Sign Up"]'));
      await element.click();
      element = await driver.findElement(By.css('#verifyemail'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(
        By.xpath('//div[@id="holder"]/div/div[2]/label')
      );
      await element.click();
      element = await driver.findElement(By.css('#submitBtn'));
      await element.click();
    },
  },
  'www.childrensplace.com': {
    enabled: false,
    category: family,
    emailSubscribeUrl: 'https://www.childrensplace.com/us/home',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(
        By.xpath(
          '//div[@id="__next"]/div[2]/footer/div/div/div/div/form/div/div/div/label/p'
        )
      );
      await element.click();
      element = await driver.findElement(By.css('#signup'));
      await element.sendKeys(emailAddress);
      element = await driver.findElement(By.css('#isEmailOptInSecondBrand'));
      await element.click();
      element = await driver.findElement(By.xpath('//button[@type="submit"]'));
      await element.click();
    },
  },
  'www.gap.com': {
    enabled: false,
    category: apparel,
    emailSubscribeUrl: 'https://www.gap.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(By.css('[name="email"]'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(
        By.xpath(
          '//div[@id="footer"]/div/div/div/div/div[2]/div/form/div[3]/button'
        )
      );
      await element.click();
    },
  },
  'us.shein.com': {
    enabled: false,
    category: apparel,
    emailSubscribeUrl: 'https://us.shein.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(
        By.xpath('//input[@type="email"]')
      );
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(
        By.xpath(
          '//*[normalize-space(text()) and normalize-space(.)="Please agree to our Privacy & Cookie Policy."])[1]/following::div[2]'
        )
      );
      await element.click();
    },
  },
  'www.jcpenney.com': {
    enabled: true,
    category: apparel,
    emailSubscribeUrl: 'https://www.jcpenney.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.wait(
        until.elementLocated(By.css('input[data-automation-id="marketing-input"]')),
        WAIT
      );
      await scrollIntoView(driver, element);
      element = await driver.findElement(By.css('input[data-automation-id="marketing-input"]'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(
        By.css(
          'button[data-automation-id="marketing-button"]'
        )
      );
      await element.click();
      element = await driver.wait(
        until.elementLocated(By.css('#closeModalButton')),
        WAIT
      );
      await element.click();
    },
  },
  'www.jcrew.com': {
    enabled: false,
    category: apparel,
    emailSubscribeUrl: 'https://www.jcrew.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(By.css('#subscribeEmail'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(By.xpath('//button[@type="submit"]'));
      await element.click();
    },
  },
  'www.microcenter.com': {
    enabled: false,
    category: computersAndElectronics,
    emailSubscribeUrl: 'https://www.microcenter.com/',
    emailSubscribeAction: async (driver, { emailAddress, postalCode }) => {
      let element = await driver.findElement(By.css('#SignUp'));
      await element.click();
      element = await driver.findElement(By.css('#txtEmailAddress'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(By.css('[name="POSTAL_CODE_"]'));
      await element.click();
      await element.sendKeys(postalCode);
      element = await driver.findElement(By.css('[name="btnSubmit"]'));
      await element.click();
    },
  },
  'www.bestbuy.com': {
    enabled: false,
    category: computersAndElectronics,
    emailSubscribeUrl: 'https://www.bestbuy.com/?intl=nosplash',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(By.css('#footerEmailField'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(By.css('#footerEmailSignUpBtn'));
      await element.click();
    },
  },
  'www.newegg.com': {
    enabled: false,
    category: computersAndElectronics,
    emailSubscribeUrl: 'https://www.newegg.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(By.css('[name="LoginName"]'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(By.css('[link="Sign Up"]'));
      await element.click();
    },
  },
  'www.staples.com': {
    enabled: false,
    category: computersAndElectronics,
    emailSubscribeUrl: 'https://www.staples.com/',
    emailSubscribeAction: async (driver, { emailAddress }) => {
      let element = await driver.findElement(By.css('#subscribe_email'));
      await element.click();
      await element.sendKeys(emailAddress);
      element = await driver.findElement(
        By.xpath(
          '//div[@id="Subscribe_Description_content"]/div/div/span/span/div/div/span/span/button'
        )
      );
      await element.click();
    },
  },
};

exports.getSitesByCategory = category =>
  Object.keys(exports.sites)
    .filter(key => exports.sites[key].category.name === category)
    .map(key => exports.sites[key]);

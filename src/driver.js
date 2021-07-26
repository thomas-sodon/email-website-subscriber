/**
 * @fileoverview Running Chrome or Firefox in headless mode.
 *
 * To run with Chrome, ensure you have Chrome 59+ installed and that
 * chromedriver 2.30+ is present on your system PATH:
 * <https://chromedriver.chromium.org/downloads>
 *
 *     SELENIUM_BROWSER=chrome node src/index.js
 *
 * To run with Firefox, ensure you have Firefox 57+ installed and that
 * geckodriver 0.19.0+ is present on your system PATH:
 * <https://github.com/mozilla/geckodriver/releases>
 *
 *     SELENIUM_BROWSER=firefox node src/index.js
 */

const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const { Builder } = require('selenium-webdriver');

const width = 640;
const height = 480;

const { path } = require('chromedriver');

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const builder = browser => {
  if (process.env.CI) {
    return new Builder()
      .forBrowser(browser)
      .setChromeOptions(
        new chrome.Options().headless().windowSize({ width, height })
      )
      .setFirefoxOptions(
        new firefox.Options().headless().windowSize({ width, height })
      )
      .build();
  }
  return new Builder().forBrowser(browser).build();
};

module.exports = builder('chrome');

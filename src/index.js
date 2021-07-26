const PromisePool = require('async-promise-pool');
const { getSitesByCategory } = require('./data/sites');
const driver = require('./driver');

// On the Web, leave out this line and use the script tag above instead.
const users = require('./data/users');

const requests = [];
users.forEach(user => {
  user.categories.forEach(category => {
    const sites = getSitesByCategory(category.name);
    // console.log('sites', sites);
    sites
      .filter(site => site.enabled)
      .forEach(site => {
        const request = {
          user,
          site,
        };
        requests.push(request);
      });
  });
});

const requestPromise = request =>
  driver
    .get(request.site.emailSubscribeUrl)
    .then(() => request.site.emailSubscribeAction(driver, request.user))
    .then(
      () => {
        console.log(
          `${JSON.stringify(
            request.user.name,
            null,
            2
          )} successfully subscribed to ${JSON.stringify(
            request.site.name,
            null,
            2
          )}`
        );
        return driver.quit();
      },
      e =>
        driver.quit().then(() => {
          throw e;
        })
    );

const pool = new PromisePool({ concurrency: 6 });
requests.forEach(request => pool.add(() => requestPromise(request)));
pool.all().then(
  function() {
    console.log('All promises fulfilled');
    process.exit(0);
  },
  function(error) {
    console.log(`Some promise rejected: ${error.message}`);
    process.exit(1);
  }
);

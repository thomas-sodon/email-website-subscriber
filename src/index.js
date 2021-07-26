const PromisePool = require('async-promise-pool');
const { getSitesByCategory } = require('./data/sites');
const driver = require('./driver');

// On the Web, leave out this line and use the script tag above instead.
const users = require('./data/users');

const promiseProducer = () => {
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

  return Promise.all(
    requests.map(request =>
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
        )
    )
  );
};

// concurrency is the only option for PromisePool and enables you to
// choose how many promises will run at once
const pool = new PromisePool({ concurrency: 6 });

// elsewhere add functions to the pool that produce promises. We use
// functions here to prevent the promises from immediately executing.
pool.add(() => promiseProducer());

// you can await pool.all to ensure that all promises in the pool are
// resolved before continuing.
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

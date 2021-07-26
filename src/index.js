const categories = require('./data/category');
const {getSitesByCategory} = require('./data/sites');
const driver = require('./driver');
const { By, Key, until } = require('selenium-webdriver')



//  driver
//    .get('http://www.google.com/ncr')
//    .then((_) =>
//      driver.findElement(By.xpath('q')).sendKeys('webdriver', Key.RETURN)
//    )
//    .then((_) => driver.wait(until.titleIs('webdriver - Google Search'), 1000))
//    .then(
//      (_) => driver.quit(),
//      (e) =>
//        driver.quit().then(() => {
//          throw e
//        })
//    )



   // On the Web, leave out this line and use the script tag above instead. 
const PromisePool = require("async-promise-pool");
const users = require('./data/users');

var promiseProducer =  () => {
    const requests = [];
    users.forEach(user => {
        user.categories.forEach(category => {
            const sites = getSitesByCategory(category.name);
            // console.log('sites', sites);
            sites.filter(site => !site.staleSelectors).forEach(site => {
                const request = {
                    user,
                    site,
                };
                requests.push(request);
            })
            
        })
    });

    return Promise.all(requests.map(request => 
        driver
        .get(request.site.emailSubscribeUrl)
        .then(() => 
            request.site.emailSubscribeAction(driver, request.user)
        ).then(
            (_) => {
                console.log(`${JSON.stringify(request.user.name, null, 2)} successfully subscribed to ${JSON.stringify(request.site.name, null, 2)}`);
                return driver.quit();
            },
            (e) =>
              driver.quit().then(() => {
                throw e
              })
          )
    ));
};

// // The number of promises to process simultaneously. 
// var concurrency = 1
// console.log("We restarted");

// // Create a pool. 
// var pool = new PromisePool(promiseProducer, concurrency)

// // Start the pool. 
// pool.start().then(function () {
//   console.log('All promises fulfilled');
//   process.exit(0);
// }, function (error) {
//   console.log('Some promise rejected: ' + error.message)
//   process.exit(1);
// })

// concurrency is the only option for PromisePool and enables you to 
// choose how many promises will run at once
const pool = new PromisePool({ concurrency: 1 });

// elsewhere add functions to the pool that produce promises. We use
// functions here to prevent the promises from immediately executing.
pool.add(() => promiseProducer());

// you can await pool.all to ensure that all promises in the pool are 
// resolved before continuing.
pool.all().then(function () {
    console.log('All promises fulfilled');
    process.exit(0);
  }, function (error) {
    console.log('Some promise rejected: ' + error.message)
    process.exit(1);
  })
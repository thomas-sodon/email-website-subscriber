# subscriber
- Run:
    ```
    npm install
    ```
- To run subscriber:
    ```
    SELENIUM_BROWSER=chrome node src/index.js
    ```
- To run subscriber in headless mode:
    ```
    SELENIUM_BROWSER=chrome CI=true node src/index.js
    ```
- Update the emailSubscribeAction for each site within src/data/sites.js to fix the selector steps
- A site can be enabled or disabled based on the following site attribute:
    ```
    enabled: true
    ```
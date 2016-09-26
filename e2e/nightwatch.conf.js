// this should dl latest selenium and chromedriver, doesn't work because of work security settings
require('selenium-download').ensure('./bin', function(error) {
    if (error) {
        return console.log(error);
    } else {
        console.log('✔ Selenium & Chromedriver downloaded to:', './bin');
    }
});


module.exports = {
    "src_folders": [
        "."
    ],
    "output_folder": "./reports",
    "selenium": {
        "start_process": true,
        "server_path": "./bin/selenium.jar",
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver" : "./bin/chromedriver"
        }
    },
    "test_settings": {
        "default": {
            "launch_url" : "http://localhost:9002",
            "screenshots": {
                "enabled": false,
                "path": './screenshots'
            },
            "globals": {
                "waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
            },
            "desiredCapabilities": {
                "browserName": "chrome"
            }
        },
        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true // set to false to test progressive enhancement
            }
        }
    },
    "test_runner": "mocha"
};
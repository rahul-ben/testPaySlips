"use strict";

var config = {
    "development": {
        "web_server": {
            "url": "http://localhost:3000",
            "port": 3000,
        }
    },
    "test": {
        "web_server": {
            "url": "http://localhost:3000",
            "port": 3000,
        }
    },
    "production": {
        "web_server": {
            "url": "http://demo.example.com",
            "port": 80 
        }
    }
};

const { NODE_ENV } = process.env;

module.exports = config[NODE_ENV];
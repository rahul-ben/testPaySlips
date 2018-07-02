const express = require('express');
const http = require('http');
const config = require('./settings/config')

const app = express();

require('./settings/express').configure(app);
require('./settings/routes').configure(app);

const server = http.createServer(app);
const port = config.web_server.port;

module.exports.module  =  server.listen(port, () => {
    console.log('app running at ' + port)
});

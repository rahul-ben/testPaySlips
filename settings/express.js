const bodyParser = require('body-parser');

module.exports.configure = (app) => {
    /* modules integration in express app */
    app.use(bodyParser.json({limit: '500mb'}));

    return app;
};
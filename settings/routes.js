const paySlip = require('./../controllers/payslipController.js');

module.exports.configure = (app) => {

    /*==========Base Page=================*/
    app.get('/', function(req, res) {
        res.status(200).send('app running');
    });

    /*=========paySlip controller=============*/
    app.post('/api/paySlip', paySlip.create);

    return app;
};
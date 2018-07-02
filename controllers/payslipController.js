const async = require("async");
const responseHelper = require("./../helpers/response");  /* response class */
const calculation = require("./../components/calculation");  /* calculation class */
const validateSlip = require('./../validations/paySlips');

module.exports.create = (req, res) => {
    async.waterfall([
        (cb) => {    /* validate */
            validateSlip.payslipForm(req.body).is_valid( (err, form) => {
                if (err) return cb(err);

                cb(null, form.data);
            });
        },
        (form, cb) => {     /* calculate */
            calculation.calculationMethod(form.annualSalary, form.superRate, (err, calculatedResults) => {
                if (err) return cb(err);

                cb(null, calculatedResults, form);
            });
        }, 
        (calculatedResults, form, cb) => {  /* rounding off */
            calculatedResults.paymentStartDate = form.paymentStartDate;
            calculatedResults.netIncome = calculatedResults.netIncome.toFixed();
            calculatedResults.incomeTax = calculatedResults.incomeTax.toFixed();
            calculatedResults.superAmount = calculatedResults.superAmount.toFixed();
            calculatedResults.grossIncome = calculatedResults.grossIncome.toFixed();

            cb(null, calculatedResults)
        }
    ], (err, calculatedResults) => {
        const response = responseHelper(res);   /* response helper class */

        if(err) return response.failure(err, 400)    /* failure response */

        response.success(calculatedResults, 200)    /* success response */
    });
};
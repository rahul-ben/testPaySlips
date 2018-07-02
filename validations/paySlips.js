const forms = require('forms');
const handler = require('../helpers/input_handler');

const fields = forms.fields;
const validators = forms.validators;

const payslipForm = forms.create({
    superRate: fields.number({
        required: validators.required('superRate is required'),
    }),
    annualSalary: fields.number({
        required: validators.required('annualSalary is required'),
    }),
    firstName: fields.string({
        required: validators.required('firstName is required'),
    }),
    lastName: fields.string({
        required: validators.required('lastName is required'),
    }),
    paymentStartDate: fields.string({
        required: validators.required('paymentStartDate is required'),
    })
});

module.exports.payslipForm = handler.validations(payslipForm);

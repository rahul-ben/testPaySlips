'use strict';

const input_errors = (form) => {
    let errors = {};
    let field = {};

    for (field in form.fields) {
        if (form.fields[field].error) {
            errors[field] = form.fields[field].error;
        }
    }

    return errors;
};

module.exports.validations = (form) => (model) => {
    const is_valid = (callback) => {
        form.handle(model, {
            error: function (resultForm) {
                callback(input_errors(resultForm));
            },
            success: function (form) {
                callback(null, form);
            }
        });
    };

    return {
        is_valid,
    };
};


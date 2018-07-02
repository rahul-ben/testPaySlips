'use strict';
module.exports = (res) => {
    const success = (data, code) => {
        res.status(code  || 200).send({
            is_success: true,
            data: data || {}
        });
    };

    const failure = (error, code) => {
        res.status(code || 400).send({
            is_success: false,
            error: error
        });
    };

    return {
        success,
        failure,
    };
};
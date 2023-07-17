const { validationResult } = require('express-validator');

const validatorResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next(); // continua hacia el controlador
    } catch (err) {
        res.status(403);
        res.send({ errors: err.array() });
    }
};

module.exports = validatorResults
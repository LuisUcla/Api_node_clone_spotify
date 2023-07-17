const { check } = require('express-validator');
const validatorResults = require('../utils/handleValidator');

const validatorGetItem = [ // es para validar el dato 'id' que viene por parametro
    check('id') // que sea el campo 'id' 
    .exists() // que exista ese campo
    .notEmpty() // que no sea vacio
    .isMongoId(), // y que sea un id de mongo o que tenga la estructura

    (req, res, next) => validatorResults(req, res, next)
]

module.exports = { validatorGetItem }
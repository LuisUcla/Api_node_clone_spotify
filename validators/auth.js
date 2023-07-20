const { check } = require('express-validator');
const validatorResults = require('../utils/handleValidator');


const validatorLogin = [  

    check('email')
    .exists()
    .notEmpty()
    .isEmail(),
    
    check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 }),


    (req, res, next) => validatorResults(req, res, next)
]

// para validar los datos de registro de un usuario y 
// generar el token de registro

const validatorRegister = [ // este es el middleware en la peticion de /auth/register
    check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 }),

    check('age')
    .exists()
    .notEmpty()
    .isNumeric(),

    check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 }),

    check('email')
    .exists()
    .notEmpty()
    .isEmail(),

    (req, res, next) => validatorResults(req, res, next)
]

module.exports = { validatorRegister, validatorLogin }
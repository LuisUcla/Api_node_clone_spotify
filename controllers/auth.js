const { matchedData } = require('express-validator')
const { encrypt, compare } = require('../utils/handlePassword')
const { userModel } = require('../models');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');

// registra un nuevo usuario
const registerCtrl = async (req, res) => {
   try {
    req = matchedData(req); // limpia la data
    const passwordHash = await encrypt(req.password) // encripta la contrasenna
    const body = {...req, password: passwordHash}; // sobreescribe el atributo contrasenna
    const dataUser = await userModel.create(body); // se registra en la db
    dataUser.set('password', undefined, { strict: false }) // permite el filtrado de los metodos de la contrasena
    
    const data = {
        token: await tokenSign(dataUser), // retorna un token con los datos de usuario: {_id, role}
        user: dataUser
    }
    res.send({ data })
   } catch (e) {
    handleHttpError(res, 'ERROR_REGISTER_USER...')
   }
}

// login del usuario
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req); // limpia la data
        const user = await userModel.findOne({ email: req.email })
        .select('password email name role'); // se usa en db no relacionales
        if (!user) {
            handleHttpError(res, 'USER_NO_EXIST', 404) // si el usuario no existe
            return;
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);

        if (!check) {
            handleHttpError(res, 'PASSWORD_INVALID', 401) // cotrasenna invalida
            return;
        }
        user.set('password', undefined, { strict: false }) // permite el filtrado de los metodos de la contrasena (no permite que se envie la contrasena en la respuesta)
        const data = {
            token: await tokenSign(user), // genera el token de inicio de sesion
            user
        }

        res.send({ data })
    } catch (e) {
        console.log(e)
        handleHttpError(res, 'ERROR_LOGIN_USER...')
    }

}

module.exports = { registerCtrl, loginCtrl }
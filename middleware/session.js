const { userModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_SESSION", 401);
            return;
        }
        
        // capturar el token
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = verifyToken(token);

        if (!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }

        /* 
            se captura el usuario que hace la ejecucion del 
            endpoint, sirve para llevar un historial 
            de quien hace las llamadas
        */
        const user = await userModel.findById(dataToken._id);
        req.user = user; // se manda este dato en la peticion

        next();
    } catch (e) {
        handleHttpError(res, 'NOT_SESSION', 401);
    }
};

module.exports = authMiddleware;
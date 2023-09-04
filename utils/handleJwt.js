const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKeys = getProperties();

const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );

    return sign;

} 

const verifyToken = (tokenJwt) => { // verifica que el token este firmado por el usuario o jwt
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }
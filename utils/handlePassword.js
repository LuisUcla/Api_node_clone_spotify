const bcryptjs = require('bcryptjs');

const encrypt = async (passwordPlane) => {
    const hash = await bcryptjs.hash(passwordPlane, 10) // realiza una contrasenna mas aleatoria
    return hash;
}
// Pasar contrasenna sin encriptar y pasar contrasenna encriptada
const compare = async (passwordPlane, hashPassword) => {
    return await bcryptjs.compare(passwordPlane, hashPassword)
}

module.exports = { encrypt, compare };
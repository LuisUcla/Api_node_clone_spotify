const { handleHttpError } =  require('../utils/handleError')
const checkRol = (roles) => (req, res, next) => { // roles: array con los roles admin o user
    try {
        const { user } = req;
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle)) // retorna true, false

        if (!checkValueRol) {
            handleHttpError(res, 'USER_NOT_PREMISSIONS', 403);
            return
        }
        next();
    } catch (e) {
        handleHttpError(res, 'ERROR_PREMISSIONS', 403)
    }
}

module.exports = checkRol
//Importar dependencias
const jwt = require('jwt-simple');
const moment = require('moment');

//Clave secreta
const secret = 'CLAVE_SECRETA_DE_PRACTICA_DE_API_REST_NELSON_231199';

//Crear una función para generar el token
const createToken = (user) => {
    const payload = {
        id: user.ID,
        nick: user.NICK,
        password: user.PASSWORD,
        name: user.NOMBRE,
        surname: user.APELLIDO,
        email: user.EMAIL,
        fechacrea: user.FECHACREA,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    };
    //Devolver el token
    return jwt.encode(payload, secret);
}

module.exports = {
    createToken,
    secret
}
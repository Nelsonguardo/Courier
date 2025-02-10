const validator = require('validator');

const validate = (params) => {
    let errors = [];

    if (validator.isEmpty(params.name) || !validator.isLength(params.name, { min: 3 }) || !validator.isAlpha(params.name, 'es-ES')) {
        errors.push('El nombre es inválido');
    }

    if (validator.isEmpty(params.last_name) || !validator.isLength(params.last_name, { min: 3 }) || !validator.isAlpha(params.last_name, 'es-ES')) {
        errors.push('El apellido es inválido');
    }

    if (validator.isEmpty(params.email) || !validator.isEmail(params.email)) {
        errors.push('El correo electrónico es inválido');
    }

    if (validator.isEmpty(params.password) || !validator.isLength(params.password, { min: 8 })) {
        errors.push('La contraseña es inválida');
    }

    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
}


module.exports = {
    validate
};
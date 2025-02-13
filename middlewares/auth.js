import jwt from 'jwt-simple';
import moment from 'moment';
import { secret } from '../services/jwt.js';

export const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: 'error',
            message: 'La petición no tiene la cabecera de autenticación'
        });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        let payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: 'error',
                message: 'El token ha expirado'
            });
        }

        req.user = payload;
    } catch (error) {
        return res.status(404).send({
            status: 'error',
            message: 'Token inválido',
            error
        });
    }

    next();
};
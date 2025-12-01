import jwt from 'jsonwebtoken';
import configService from "./config.service.js";

/**
 * Genera un token JWT con el payload proporcionado
 * @param {Object} payload - Datos a incluir en el token
 * @param {string} [expiresIn='24h'] - Tiempo de expiración del token
 * @returns {string} Token JWT firmado
 */
export const generarJWT = (payload, expiresIn = '24h') => {
    try {
        const options = {
            expiresIn,
            issuer: 'mascotas-api',
            algorithm: 'HS256'
        };

        return jwt.sign(payload, configService.SECRET, options);
    } catch (error) {
        console.error('Error al generar el token JWT:', error);
        throw new Error('Error al generar el token de autenticación');
    }
};

/**
 * Verifica y decodifica un token JWT
 * @param {string} token - Token JWT a verificar
 * @returns {Object|null} Datos decodificados del token o null si es inválido
 */
export const verificarToken = (token) => {
    try {
        if (!token) {
            throw new Error('Token no proporcionado');
        }

        const tokenParts = token.split(' ');
        const tokenValue = tokenParts.length === 2 ? tokenParts[1] : token;

        const decoded = jwt.verify(tokenValue, configService.SECRET);
        
        return {
            id: decoded.id,
            email: decoded.email,
            rol: decoded.rol
        };
    } catch (error) {
        console.error('Error al verificar el token JWT:', error.message);
        return null;
    }
};

/**
 * Middleware para extraer el token del encabezado de autorización
 * @param {Object} req - Objeto de solicitud de Express
 * @returns {string|null} Token JWT o null si no se encuentra
 */
export const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
    }
    return null;
};
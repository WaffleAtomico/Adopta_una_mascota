import { request, response } from "express";
import { verificarToken, extractToken } from '../Utils/jwt.generator.js';
import { Roles } from "../Types/roles.types.js";

/**
 * Middleware para validar la autenticidad del token JWT
 * @param {Array} [roles=[]] - Lista de roles permitidos (opcional)
 * @returns {Function} Middleware de Express
 */
export const validarToken = (roles = []) => {
  return async (req = request, res = response, next) => {
    try {
      // Extraer el token del encabezado, query o cookies
      const token = extractToken(req);
      
      if (!token) {
        if (req.baseUrl.includes('api')) {
          return res.status(401).json({
            success: false,
            msg: 'No se proporcionó token de autenticación',
          });
        }
        return res.redirect('/login');
      }

      // Verificar y decodificar el token
      const decoded = verificarToken(token);
      
      if (!decoded) {
        if (req.baseUrl.includes('api')) {
          return res.status(401).json({
            success: false,
            msg: 'Token inválido o expirado',
          });
        }
        return res.redirect('/login');
      }

      //Validar que el rol del usuario sea valido
      const validRoles = Object.values(Roles);
      if (!validRoles.includes(decoded.role)) {
        if (req.baseUrl.includes('api')) {
          return res.status(403).json({
            success: false,
            msg: 'Rol de usuario no válido',
          });
        }
        return res.redirect('/unauthorized');
      }

      // Validar que el rol del usuario esté en la lista de roles permitidos (si se especificó)
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        if (req.baseUrl.includes('api')) {
          return res.status(403).json({
            success: false,
            msg: 'No tiene permisos para acceder a este recurso',
          });
        }
        return res.redirect('/unauthorized');
      }

      // Adjuntar información del usuario al objeto de solicitud
      req.usuario = decoded;
      
      req.headers['tipo-usuario'] = decoded.role;
      
      if (req.baseUrl.includes('api')) {
        req.headers['user-id'] = decoded.id;
        req.headers['user-role'] = decoded.role;
      }

      next();
    } catch (error) {
      console.error('Error en la validación del token:', error);
      
      if (req.baseUrl.includes('api')) {
        return res.status(401).json({
          success: false,
          msg: 'Error en la autenticación',
          error: error.message,
        });
      }
      return res.redirect('/login');
    }
  };
};

/**
 * Middleware para verificar si el usuario tiene un rol específico
 * Debe usarse después de validarToken
 * 
 * @param {...string} roles - Roles permitidos
 * @returns {Function} Middleware de Express
 */
export const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        success: false,
        msg: 'Se quiere verificar el rol sin validar el token primero',
      });
    }

    if (!roles.includes(req.usuario.role)) {
      return res.status(403).json({
        success: false,
        msg: `El servicio requiere uno de estos roles: ${roles.join(', ')}`,
      });
    }

    next();
  };
};
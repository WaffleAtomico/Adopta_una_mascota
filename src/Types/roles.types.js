/**
 * @fileoverview Constantes para los roles de usuario.
 * Define los diferentes niveles de acceso y permisos dentro de la aplicación.
 */

/**
 * @constant
 * @type {Readonly<{ADMIN: string,  OWNER: string}>}
 * @description Objeto inmutable (congelado) que contiene las constantes para los roles de usuario.
 * @property {string} ADMIN El rol con los máximos permisos, típicamente para la administración del sistema.
 * @property {string} OWNER El rol con permisos limitados, asociado a un usuario final.
 */
export const Roles = Object.freeze({
    ADMIN : 'ADMIN',
    OWNER: 'OWNER',
    USER: 'USER',
});

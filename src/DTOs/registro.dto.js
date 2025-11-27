import { checkSchema } from "express-validator";
import { Roles } from "../Types/roles.types.js";

/**
 * Esquema de validación para el registro de un nuevo usuario.
 * 
 * Este esquema define las reglas que deben cumplirse en el cuerpo (body)
 * de la solicitud HTTP para registrar un nuevo usuario en el sistema.
 * 
 * Campos validados:
 * 
 * - nombre:
 *   - Opcional, pero si se envía no puede estar vacío.
 *   - Se eliminan espacios en blanco al inicio y final.
 *   - Error: "El nombre no puede estar vacío"
 * 
 * - apellidoPaterno:
 *   - Obligatorio, no puede estar vacío.
 *   - Se eliminan espacios en blanco al inicio y final.
 *   - Error: "El apellido paterno es obligatorio"
 * 
 * - email:
 *   - Obligatorio, debe ser un correo electrónico con formato válido.
 *   - Se convierte a minúsculas automáticamente.
 *   - Error: "El email no es válido"
 * 
 * - password:
 *   - Obligatorio, debe tener entre 8 y 16 caracteres.
 *   - Error: "La contraseña debe tener entre 8 y 16 caracteres"
 * 
 * - numero:
 *   - Obligatorio, no puede estar vacío.
 *   - Se eliminan espacios en blanco al inicio y final.
 *   - Error: "El número de teléfono es obligatorio"
 * 
 * - tipo:
 *   - Opcional, por defecto es 'celular'.
 *   - Debe ser uno de: 'celular', 'casa', 'trabajo'.
 *   - Error: "Tipo de teléfono no válido"
 */

export const registroDTO = checkSchema({
    nombre: {
        optional: true,
        trim: true,
        notEmpty: {
            errorMessage: 'El nombre no puede estar vacío',
            options: {
                ignore_whitespace: true,
            },
        },
    },
    apellidoPaterno: {
        notEmpty: {
            errorMessage: 'El apellido paterno es obligatorio',
            options: {
                ignore_whitespace: true,
            },
        },
        trim: true,
    },
    email: {
        isEmail: {
            errorMessage: 'El email no es válido',
        },
        normalizeEmail: true,
    },
    password: {
        isLength: {
            options: { min: 8, max: 16 },
            errorMessage: 'La contraseña debe tener entre 8 y 16 caracteres',
        },
    },
    numero: {
        notEmpty: {
            errorMessage: 'El número de teléfono es obligatorio',
            options: {
                ignore_whitespace: true,
            },
        },
        trim: true,
    },
    tipo: {
        optional: true,
        isIn: {
            options: [['celular', 'casa', 'trabajo']],
            errorMessage: 'Tipo de teléfono no válido',
        },
        default: 'celular',
    },
});

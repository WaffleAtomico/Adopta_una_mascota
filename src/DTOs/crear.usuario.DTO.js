import { checkSchema } from "express-validator";

/**
 * Esquema de validación para la creación de un usuario.
 * 
 * Este esquema se utiliza con express-validator para asegurar que los datos
 * enviados en el cuerpo de la solicitud cumplan con los requisitos mínimos
 * antes de ser procesados o almacenados en la base de datos.
 * 
 * Campos validados:
 * 
 * - nombre:
 *   - Opcional, pero si se envía no puede estar vacío.
 *   - Se eliminan espacios en blanco al inicio y final.
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
 * - numero:
 *   - Obligatorio, no puede estar vacío.
 *   - Se eliminan espacios en blanco al inicio y final.
 *   - Error: "El número de teléfono es obligatorio"
 * 
 * - tipo:
 *   - Opcional, por defecto es 'celular'.
 *   - Debe ser uno de: 'celular', 'casa', 'trabajo'.
 *   - Error: "Tipo de teléfono no válido"
 * 
 * - perfil:
 *   - Opcional, URL de la imagen de perfil.
 * 
 * - ciudad:
 *   - Opcional, se eliminan espacios en blanco.
 * 
 * - estado:
 *   - Opcional, se eliminan espacios en blanco.
 */

export const crearUsuarioDTO = checkSchema({
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
    password: {
      isLength:{
        options: {min: 8, max:16},
        errorMessage: 'La contraseña no puede ser mayor a 16 ni menor a 8 caracteres'
      }
    },
    email: {
        isEmail: {
            errorMessage: 'El email no es válido',
        },
        normalizeEmail: true,
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
    perfil: {
        optional: true,
        isURL: {
            errorMessage: 'La URL de la imagen de perfil no es válida',
        },
    },
    ciudad: {
        optional: true,
        trim: true,
    },
    estado: {
        optional: true,
        trim: true,
    },
});
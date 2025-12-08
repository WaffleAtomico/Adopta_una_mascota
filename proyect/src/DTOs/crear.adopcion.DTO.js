import { checkSchema } from "express-validator";

export const crearSolicitudAdopcionDTO = checkSchema({
  mascota: {
    notEmpty: {
      errorMessage: "El ID de la mascota es obligatorio"
    },
    isMongoId: {
      errorMessage: "El ID de la mascota debe ser un MongoID válido"
    }
  },

  solicitante: {
    notEmpty: {
      errorMessage: "El ID del solicitante es obligatorio"
    },
    isMongoId: {
      errorMessage: "El ID del solicitante debe ser un MongoID válido"
    }
  },

  propietario: {
    notEmpty: {
      errorMessage: "El ID del propietario es obligatorio"
    },
    isMongoId: {
      errorMessage: "El ID del propietario debe ser un MongoID válido"
    }
  },

  estado: {
    optional: true,
    isIn: {
      options: [["pendiente", "aceptada", "rechazada"]],
      errorMessage: "El estado debe ser: pendiente, aceptada o rechazada"
    }
  }
});

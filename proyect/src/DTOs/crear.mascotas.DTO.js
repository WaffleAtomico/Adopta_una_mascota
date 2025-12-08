import { checkSchema } from "express-validator";

export const crearMascotaDTO = checkSchema({
  nombre: {
    notEmpty: {
      errorMessage: "El nombre de la mascota es obligatorio",
      options: { ignore_whitespace: true }
    },
    trim: true
  },
  especie: {
    notEmpty: {
      errorMessage: "La especie es obligatoria"
    },
    isIn: {
      options: [["perro", "gato", "conejo", "ave", "reptil", "otro"]],
      errorMessage: "La especie no es válida"
    }
  },
  raza: {
    notEmpty: {
      errorMessage: "La raza es obligatoria",
      options: { ignore_whitespace: true }
    },
    trim: true
  },
  edad: {
    notEmpty: {
      errorMessage: "La edad es obligatoria"
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "La edad debe ser un número entero mayor o igual a 0"
    },
    toInt: true
  },
  sexo: {
    notEmpty: {
      errorMessage: "El sexo es obligatorio"
    },
    isIn: {
      options: [["macho", "hembra"]],
      errorMessage: "El sexo debe ser 'macho' o 'hembra'"
    }
  },
  tamaño: {
    notEmpty: {
      errorMessage: "El tamaño es obligatorio"
    },
    isIn: {
      options: [["pequeño", "mediano", "grande"]],
      errorMessage: "El tamaño debe ser 'pequeño', 'mediano' o 'grande'"
    }
  },
  caracter: {
    notEmpty: {
      errorMessage: "El carácter es obligatorio"
    },
    isIn: {
      options: [["agresivo", "amigable", "social", "independiente"]],
      errorMessage: "El carácter debe ser 'agresivo', 'amigable', 'social' o 'independiente'"
    }
  },
  estadoSalud: {
    notEmpty: {
      errorMessage: "El estado de salud es obligatorio"
    },
    isIn: {
      options: [["sano", "requiere tratamiento", "desconocido"]],
      errorMessage: "El estado de salud no es válido"
    }
  },
  ciudad: {
    notEmpty: {
      errorMessage: "La ciudad es obligatoria",
      options: { ignore_whitespace: true }
    },
    trim: true
  },
  estado: {
    notEmpty: {
      errorMessage: "El estado es obligatorio",
      options: { ignore_whitespace: true }
    },
    trim: true
  },
  peso: {
    optional: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: "El peso debe ser un número mayor o igual a 0"
    },
    toFloat: true
  },
  esterilizado: {
    optional: true,
    isBoolean: {
      errorMessage: "El campo 'esterilizado' debe ser booleano"
    },
    toBoolean: true
  },
  vacunado: {
    optional: true,
    isBoolean: {
      errorMessage: "El campo 'vacunado' debe ser booleano"
    },
    toBoolean: true
  },
  desparasitado: {
    optional: true,
    isBoolean: {
      errorMessage: "El campo 'desparasitado' debe ser booleano"
    },
    toBoolean: true
  },
  microchip: {
    optional: true,
    isBoolean: {
      errorMessage: "El campo 'microchip' debe ser booleano"
    },
    toBoolean: true
  },
  nivelActividad: {
    optional: true,
    isIn: {
      options: [["bajo", "medio", "alto"]],
      errorMessage: "El nivel de actividad debe ser 'bajo', 'medio' o 'alto'"
    }
  },
  descripcion: {
    optional: true,
    trim: true
  },
  "fotos": {
    optional: true,
    isArray: {
      errorMessage: "'fotos' debe ser un arreglo de URLs"
    }
  },
  "fotos.*": {
    optional: true,
    isString: {
      errorMessage: "Cada elemento de 'fotos' debe ser una cadena"
    },
    trim: true
  },
  publicadoPor: {
    notEmpty: {
      errorMessage: "El campo 'publicadoPor' es obligatorio"
    },
    isMongoId: {
      errorMessage: "'publicadoPor' debe ser un ID de MongoDB válido"
    }
  }
});

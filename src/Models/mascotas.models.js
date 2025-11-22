import { Schema, model } from "mongoose";


const petSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  especie: {
    type: String,
    required: true,
    enum: ["perro", "gato", "conejo", "ave", "reptil", "otro"]
  },
  raza: {
    type: String,
    required: true,
    default: "mestizo",
    trim: true
  },
  edad: {
    type: Number,
    required: true,
    min: 0
  },
  sexo: {
    type: String,
    required: true,
    enum: ["macho", "hembra"]
  },
  tamaño: {
    type: String,
    required: true,
    enum: ["pequeño", "mediano", "grande"]
  },
  estadoSalud: {
    type: String,
    required: true,
    enum: ["sano", "requiere tratamiento", "desconocido"]
  },
  ciudad: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: String,
    required: true,
    trim: true
  },
  disponible: {
    type: Boolean,
    default: true
  },
  fechaIngreso: {
    type: Date,
    default: Date.now
  },

  peso: Number,

  esterilizado: { 
    type: Boolean, 
    default: false 
},
  vacunado: { 
    type: Boolean, 
    default: false 
},
  desparasitado: { 
    type: Boolean, 
    default: false 
},
  microchip: { 
    type: Boolean, 
    default: false 
},
  nivelActividad: {
    type: String,
    enum: ["bajo", "medio", "alto"]
  },
  descripcion: {
    type: String,
    trim: true
  },
  fotos: {
    type: [String],
    default: []
  },
  publicadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fechaAdopcion: Date,
  adoptadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true 
});

export default mongoose.model("Pet", petSchema);

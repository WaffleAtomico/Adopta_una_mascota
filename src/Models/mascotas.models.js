import { Schema, model } from "mongoose";


const PetSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fechaAdopcion: Date,
  adoptadoPor: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false
  },
  deletedAt:{
    type: Date,
    default: null,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
},
{
  timestamps: true 
});

PetSchema.pre('find', function () {
    this.where({isDeleted: false});
});

PetSchema.pre('save', function(){
  this.updateAt = Date.now();
});

export default model("Pet", PetSchema);

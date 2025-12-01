import { Schema, model } from 'mongoose';

const RolSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        enum: ['ADMIN', 'OWNER', 'USER'], // Roles permitidos
        default: 'USER'
    },
    activo: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});

// Middleware para actualizar la fecha de actualización antes de guardar
RolSchema.pre('save', function(next) {
    this.fechaActualizacion = new Date();
    next();
});

export default model('Rol', RolSchema);

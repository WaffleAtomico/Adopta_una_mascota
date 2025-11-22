import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no es válido'],
    },
    fechaIngreso: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
    deletedAt: {
        type: Date,
        default: null,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false 
    },
    apellidoPaterno: {
        type: String,
        required: true,
        trim: true,
    },
    numero:{
        type : String,
        required: true,
        trim: true,
        unique: true,
    },
    tipo:{
        type: String,
        enum: ['celular', 'casa', 'trabajo'],
        default: 'celular'
    },
    perfil:{
        type: String, //URL de la imagen
        default: null
    },
    ciudad:{
        type: String,
        trim: true,
        default: null
    },
    estado:{
        type: String,
        trim: true,
        default: null
    }
});

UsuariosSchema.pre('find', function (next){ 
    this.where({isDeleted: false});
    next();
});

UsuariosSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default model('User', UserSchema);